import { v } from "convex/values";
import { mutation, internalAction, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import {
  GoogleGenAI,
  ContentListUnion,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/genai";
import { Id } from "./_generated/dataModel";
import { imgGenPromp } from "./const";
import {
  dataURItoBlob,
  fetchImageAsBase64,
  handleGeneratedContent,
  retry,
} from "./utils";

// 4. kick in a action to talk to gpt and return an image
// 5. return that image to client and save it to preview in state

const generateDataType = {
  modal: v.string(),
  accessories: v.array(v.string()),
  style_intensity: v.number(),
  formality: v.number(),
  initial_prompt: v.string(),
  season: v.optional(
    v.union(
      v.literal("spring"),
      v.literal("summer"),
      v.literal("autumn"),
      v.literal("winter"),
    ),
  ),
  is_new_outfit: v.optional(v.boolean()),
};

export const generatorOutfit = mutation({
  // Validators for arguments.
  args: generateDataType,

  // Action implementation.
  handler: async (ctx, args) => {
    const user = await ctx.auth?.getUserIdentity();
    if (!user) throw new Error("Authentication required");
    const outfitId = await ctx.db.insert("outfit", {
      modal: args.modal,
      accessories: args.accessories,
      style_intensity: args.style_intensity,
      formality: args.formality,
      initial_prompt: args.initial_prompt,
      preview_images: [],
    });

    await ctx.scheduler.runAfter(0, internal.aiSystem.generatePreviewWithAI, {
      ...args,
      outfitId,
    });

    //   const { imageURLFinal, summary } = await ctx.scheduler.waitForCompletion(scheduledId);
    //   const previewStorageId = imageURLFinal;

    // console.log("Generated outfit:", outfitId, previewStorageId);
    // return { currentOutfit: previewStorageId };
    return { outfitId };
  },
});

export const updateOutfitPreview = mutation({
  args: {
    outfitId: v.string(),
    previewImageId: v.string(),
    summary: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.outfitId as Id<"outfit">, {
      preview_images: [args.previewImageId],
      summary: args.summary,
    });
  },
});

// Get data URL from image URL
export const getOutfitById = query({
  // Validators for arguments.
  args: {
    outfitId: v.string(),
  },

  // Function implementation.
  handler: async (ctx, args) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    const outfit = await ctx.db
      .query("outfit")
      .filter((q) => q.eq(q.field("_id"), args.outfitId))
      .collect();

    return outfit[0] || null;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const generatePreviewWithAI = internalAction({
  // Validators for arguments.
  args: { ...generateDataType, outfitId: v.string() },

  // Action implementation.
  handler: async (ctx, args) => {
    const { accessories, style_intensity, formality, initial_prompt, modal } =
      args;
    const modalUrl = await ctx.storage.getUrl(args.modal as Id<"_storage">);

    if (!modalUrl) {
      throw new Error("No modal URL found");
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || "",
    });

    const base64Image = await fetchImageAsBase64(modalUrl);
    const accListBase64 = await Promise.all(
      accessories.map(async (acc) => {
        const url = await ctx.storage.getUrl(acc as Id<"_storage">);
        return url ? await fetchImageAsBase64(url) : null;
      }),
    );
    const fullPrompt: ContentListUnion = [
      { text: imgGenPromp },
      {
        text: `
        Modal: [First image]
        Accessories: [Every other image]
        Style Intensity: ${style_intensity}
        Formality: ${formality}
        Season: ${args.season || "Winter"}
        User Prompt: ${initial_prompt}
        Is New Outfit: ${args.is_new_outfit || true}
        `,
      },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      },
      ...accListBase64
        .filter((base64): base64 is string => base64 !== null)
        .map((base64) => ({
          inlineData: {
            mimeType: "image/png",
            data: base64, // base64 string only
          },
        })),
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: fullPrompt,
      config: {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.OFF,
          },
        ],
      },
    });

    const { hasInlineData, imageURL, summary } =
      handleGeneratedContent(response);

    let imageURLFinal = imageURL;
    if (!hasInlineData && response?.candidates?.[0]?.content?.parts) {
      // If no image generated, retry with only the first image and a summary of the previous attempt

      const textContent = response.candidates[0].content.parts
        .filter((part) => part.text)
        .map((part) => part.text)
        .join(" ");

      if (textContent.includes("no human found")) {
        throw new Error("No human found in the provided image.");
      }
      imageURLFinal = await retry(ai, base64Image, textContent);
    }

    if (!imageURLFinal) throw new Error("No image URL returned from DALL·E");

    // console.log("Generating upload URL");
    const postUrl = await ctx.storage.generateUploadUrl();
    // console.log("Generated upload URL:", postUrl);

    // console.log("Fetching and processing image");
    const blob = dataURItoBlob(imageURLFinal);
    const modalFile = new File([blob], "preview" + args.outfitId, {
      type: blob.type || "application/octet-stream",
    });

    // console.log("Uploading processed image");
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": modalFile.type },
      body: modalFile,
    });

    const data = await result.json();
    // console.log("Upload complete, storage ID:", previewStorageId);
    console.log("Generated outfit:", args.outfitId, data);
    await ctx.scheduler.runAfter(0, api.aiSystem.updateOutfitPreview, {
      outfitId: args.outfitId,
      previewImageId: data.storageId,
      summary,
    });
  },
});

// You can fetch data from and send data to third-party APIs via an action:
// export const myAction = action({
//   // Validators for arguments.
//   args: {
//     first: v.number(),
//     second: v.string(),
//   },

//   // Action implementation.
//   handler: async (ctx, args) => {
//     //// Use the browser-like `fetch` API to send HTTP requests.
//     //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     // const response = await ctx.fetch("https://api.thirdpartyservice.com");
//     // const data = await response.json();

//     //// Query data by running Convex queries.
//     const data = await ctx.runQuery(api.aiSystem.listNumbers, {
//       count: 10,
//     });
//     console.log(data);

//     //// Write data by running Convex mutations.
//     await ctx.runMutation(api.aiSystem.addNumber, {
//       value: args.first,
//     });
//   },
// });
