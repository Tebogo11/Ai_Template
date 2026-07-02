/**
 * AI-powered outfit generation module using Google GenAI (Gemini).
 * Enables users to generate stylish outfit combinations based on clothing items and prompts.
 */

import { v } from 'convex/values';
import { internalAction, internalMutation } from '../_generated/server';
import { Id } from '../_generated/dataModel';
import {
  dataURItoBlob,
  fetchImageAsBase64WithMime,
  handleGeneratedContent,
} from '../utils';
import { internal } from '../_generated/api';
import { GoogleGenAI } from '@google/genai';
import { OUTFIT_GENERATION_PROMPT, OUTFIT_IMPROVEMENT_PROMPT } from '../const';

function getAI() {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GOOGLE_GENAI_API_KEY environment variable is not set. Please configure it in your Convex environment variables.',
    );
  }
  return new GoogleGenAI({ apiKey });
}

const DEFAULT_IMAGE_MODEL = 'gemini-3.1-flash-image';

const resolveImageModel = () => process.env.GEMINI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL;

const resolveImageSize = (model: string) => {
  // Flash Lite image models only support 1K output.
  if (model.includes('flash-lite-image')) {
    return '1K';
  }

  return '2K';
};

export const generateOutFitWithAI = internalAction({
  args: {
    modal: v.string(),
    accessories: v.array(v.object({ storageId: v.string() })),
    prompt: v.string(),
    is_new_outfit: v.boolean(),
    outfitId: v.id('outfit'),
    title: v.optional(v.string()),
    previewId: v.id('previewImage'),
  },
  handler: async (ctx, args) => {
    try {
      const ai = getAI();
      const imageModel = resolveImageModel();

      // 1. Fetch model image from storage
      const modelUrl = await ctx.storage.getUrl(args.modal as Id<'_storage'>);
      if (!modelUrl) {
        throw new Error('Model image URL not found in storage');
      }

      const base64ModelImage = await fetchImageAsBase64WithMime(modelUrl);

      // 2. Fetch accessory images
      const accessoryBase64List = await Promise.all(
        args.accessories.map(async (acc) => {
          const url = await ctx.storage.getUrl(acc.storageId as Id<'_storage'>);
          return url ? await fetchImageAsBase64WithMime(url) : null;
        }),
      );

      // 3. Build Interactions API multimodal input
      const input = [
        {
          type: 'text' as const,
          text: args.is_new_outfit ? OUTFIT_GENERATION_PROMPT : OUTFIT_IMPROVEMENT_PROMPT,
        },
        {
          type: 'text' as const,
          text: `User prompt: ${args.prompt}`,
        },
        {
          type: 'text' as const,
          text: `Is new outfit: ${args.is_new_outfit}`,
        },
        {
          type: 'text' as const,
          text: 'Reference image 1 is the model photo. Remaining images are clothing/accessory references.',
        },
        {
          type: 'image' as const,
          mime_type: base64ModelImage.mimeType,
          data: base64ModelImage.data,
        },
        ...accessoryBase64List
          .filter((img): img is NonNullable<(typeof accessoryBase64List)[number]> =>
            Boolean(img),
          )
          .map((img) => ({
            type: 'image' as const,
            mime_type: img.mimeType,
            data: img.data,
          })),
      ];

      // 4. Create image interaction with Google docs-aligned response format.
      const interaction = await ai.interactions.create({
        model: imageModel,
        input,
        response_format: {
          type: 'image',
          mime_type: 'image/jpeg',
          aspect_ratio: '3:4',
          image_size: resolveImageSize(imageModel),
        },
        generation_config: {
          thinking_level: 'high',
        },
      });

      // 5. Extract generated image from output_image or model_output steps.
      const { hasInlineData, imageURL } = handleGeneratedContent(interaction);
      if (!hasInlineData || !imageURL) {
        throw new Error('No image URL returned from model');
      }

      // 6. Upload generated image to Convex storage
      const postUrl = await ctx.storage.generateUploadUrl();
      const blob = dataURItoBlob(imageURL);
      const previewFile = new File([blob], `preview-${args.outfitId}`, {
        type: blob.type || 'application/octet-stream',
      });

      const uploadResult = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': previewFile.type },
        body: previewFile,
      });
      const uploadData = await uploadResult.json();

      // 9. Save preview and mark outfit as done
      await ctx.runMutation(internal.generator.action.savePreviewImage, {
        storageId: uploadData.storageId,
        previewId: args.previewId,
        outfitId: args.outfitId || '',
      });

      return imageURL;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error during outfit generation';
      console.error('Error generating outfit:', errorMessage, error);

      await ctx.runMutation(internal.generator.action.markOutfitError, {
        outfitId: args.outfitId,
        error: errorMessage,
      });
      return errorMessage;
    }
  },
});

// util
export const markOutfitError = internalMutation({
  args: {
    outfitId: v.id('outfit'),
    error: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.outfitId, {
      status: 'error',
      error: args.error,
    });
  },
});

export const savePreviewImage = internalMutation({
  args: {
    storageId: v.string(),
    outfitId: v.string(),
    previewId: v.id('previewImage'),
  },
  handler: async (ctx, args) => {
    try {
      // 3. Update the preview image record in the database with the new image URL
      await ctx.db.patch(args.previewId, {
        imageUrl: args.storageId,
      });

      // 4. Update the outfit status to 'done' after successfully saving the preview image
      await ctx.db.patch(args.outfitId as Id<'outfit'>, {
        status: 'done',
      });
    } catch (error) {
      // If there's an error during the upload or database update, set the outfit status to 'error' and log the error
      await ctx.db.patch(args.outfitId as Id<'outfit'>, {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      console.error('Error saving preview image:', error);
      throw new Error('Failed to save preview image');
    }
  },
});
