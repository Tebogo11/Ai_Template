import { v } from 'convex/values';
import { internalAction } from './_generated/server';
import { api } from './_generated/api';
import {
  GoogleGenAI,
  ContentListUnion,
  HarmCategory,
  HarmBlockThreshold,
  Part,
} from '@google/genai';
import { Id } from './_generated/dataModel';
import {
  DESCRIPTION_SYSTEM_PROMPT,
  OUTFIT_GENERATION_PROMPT,
  OUTFIT_IMPROVEMENT_PROMPT,
} from './const';
import {
  dataURItoBlob,
  fetchImageAsBase64,
  handleGeneratedContent,
  retry,
} from './utils';
import { generateDataType } from './outfit';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY || '',
});

const formatOptional = (label: string, value: string | null | undefined) => {
  return `${label}: ${value && value.trim() ? value.trim() : 'not provided'}`;
};

const generateDescription = async (contextPrompt: string, imageParts: Part[]) => {
  const fullPrompt: ContentListUnion = [
    { text: DESCRIPTION_SYSTEM_PROMPT },
    { text: contextPrompt },
    ...imageParts,
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: fullPrompt,
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
};

const buildContextPrompt = (args: {
  fit?: string;
  amount_of_change?: string;
  event?: string;
  initial_prompt: string;
  themes?: string[];
  is_new_outfit?: boolean;
}) => {
  return [
    formatOptional('Fit preference', args.fit),
    formatOptional('Amount of change', args.amount_of_change),
    formatOptional('Occasion', args.event),
    `Themes: ${args.themes?.length ? args.themes.join(', ') : 'not provided'}`,
    formatOptional('Specific instructions', args.initial_prompt),
    `Is new outfit: ${args.is_new_outfit ?? true}`,
  ].join('\n');
};

// export const generatePreviewWithAI = internalAction({
//   args: { ...generateDataType, outfitId: v.string() },
//   handler: async (ctx, args) => {
//     try {
//       const modalUrl = await ctx.storage.getUrl(args.modal as Id<'_storage'>);
//       if (!modalUrl) {
//         throw new Error('No model URL found');
//       }

//       const base64ModelImage = await fetchImageAsBase64(modalUrl);
//       const accessoryBase64List = await Promise.all(
//         args.accessories.map(async (acc) => {
//           const url = await ctx.storage.getUrl(acc.storageId as Id<'_storage'>);
//           return url ? await fetchImageAsBase64(url) : null;
//         }),
//       );

//       const imageParts: Part[] = [
//         {
//           inlineData: {
//             mimeType: 'image/png',
//             data: base64ModelImage,
//           },
//         },
//         ...accessoryBase64List
//           .filter((img): img is string => Boolean(img))
//           .map((img) => ({
//             inlineData: {
//               mimeType: 'image/png',
//               data: img,
//             },
//           })),
//       ];

//       const contextPrompt = buildContextPrompt({
//         initial_prompt: args.initial_prompt,
//         is_new_outfit: args.is_new_outfit,
//       });

//       // const description = await generateDescription(contextPrompt, imageParts);
//       const generationPrompt: ContentListUnion = [
//         { text: OUTFIT_GENERATION_PROMPT },
//         { text: `Context:\n${contextPrompt}` },
//         // { text: `Direction summary: ${description || 'No summary provided.'}` },
//         ...imageParts,
//       ];

//       let response = await ai.models.generateContent({
//         model: 'gemini-2.5-flash-image',
//         contents: generationPrompt,
//         config: {
//           safetySettings: [
//             {
//               category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//               threshold: HarmBlockThreshold.OFF,
//             },
//           ],
//           responseModalities: ['TEXT', 'IMAGE'],
//         },
//       });

//       let hasInlineData = false;
//       let imageURL = '';
//       let summary = '';

//       try {
//         const handled = handleGeneratedContent(response);
//         hasInlineData = handled.hasInlineData;
//         imageURL = handled.imageURL;
//         summary = handled.summary || '';
//       } catch (err) {
//         const retryResponse = await ai.models.generateContent({
//           model: 'gemini-2.5-flash-image',
//           contents: generationPrompt,
//           config: {
//             safetySettings: [
//               {
//                 category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//                 threshold: HarmBlockThreshold.OFF,
//               },
//             ],
//             imageConfig: { aspectRatio: '4:3' },
//             responseModalities: ['IMAGE'],
//           },
//         });

//         const handledRetry = handleGeneratedContent(retryResponse);
//         hasInlineData = handledRetry.hasInlineData;
//         imageURL = handledRetry.imageURL;
//         summary = handledRetry.summary || '';
//         // @ts-ignore keep downstream shape usage aligned
//         response = retryResponse;
//       }

//       let finalImageURL = imageURL;
//       if (!hasInlineData && response?.candidates?.[0]?.content?.parts) {
//         const textContent = response.candidates[0].content.parts
//           .filter((part) => part.text)
//           .map((part) => part.text)
//           .join(' ');
//         finalImageURL = await retry(ai, base64ModelImage, textContent);
//       }

//       if (!finalImageURL) {
//         await ctx.scheduler.runAfter(0, api.outfit.generationWentWrong, {
//           outfitId: args.outfitId,
//         });
//         throw new Error('No image URL returned from model');
//       }

//       const postUrl = await ctx.storage.generateUploadUrl();
//       const blob = dataURItoBlob(finalImageURL);
//       const previewFile = new File([blob], `preview-${args.outfitId}`, {
//         type: blob.type || 'application/octet-stream',
//       });

//       const uploadResult = await fetch(postUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': previewFile.type },
//         body: previewFile,
//       });
//       const uploadData = await uploadResult.json();

//       await ctx.scheduler.runAfter(0, api.outfit.updateOutfitPreview, {
//         outfitId: args.outfitId,
//         previewImageId: uploadData.storageId,
//         summary,
//       });
//     } catch (error) {
//       await ctx.scheduler.runAfter(0, api.outfit.generationWentWrong, {
//         outfitId: args.outfitId,
//       });
//       throw new Error(error instanceof Error ? error.message : 'Image generation failed');
//     }
//   },
// });
