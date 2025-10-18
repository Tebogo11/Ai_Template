import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { title } from "process";

export const generateDataType = {
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
  args: {
    ...generateDataType,
    title: v.string(),
    wardrobeId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth?.getUserIdentity();
    if (!user) throw new Error("Authentication required");

    let finalWardrobeId = args.wardrobeId as Id<"wardrobe">;
    if (!finalWardrobeId) {
      finalWardrobeId = await ctx.db.insert("wardrobe", {
        user_id: user.subject || "anonymous",
        title: args.title,
      });
    }
    const outfitId = await ctx.db.insert("outfit", {
      modal: args.modal,
      accessories: args.accessories,
      style_intensity: args.style_intensity,
      formality: args.formality,
      initial_prompt: args.initial_prompt,
      status: "generating",
      wardrobeId: finalWardrobeId,
    });
    const { title, wardrobeId, ...rest } = args;
    await ctx.scheduler.runAfter(0, internal.aiSystem.generatePreviewWithAI, {
      ...rest,
      outfitId,
    });
    return { outfitId, wardrobeId: finalWardrobeId, title: args.title };
  },
});

export const updateOutfitPreview = mutation({
  args: {
    outfitId: v.string(),
    previewImageId: v.string(),
    summary: v.string(),
  },
  handler: async (ctx, args) => {
    let title = "";
    let summary = "";
    console.log(
      "[Function]: Updating outfit preview Args:",
      args.outfitId,
      args.previewImageId,
      args.summary,
    );

    try {
      if (args.summary) {
        const [tempTitle, tempTitleDescription] = args.summary
          .split("|")
          .map((s) => s.trim());

        title = tempTitle || "Untitled Outfit";
        summary = tempTitleDescription || args.summary;
      }
    } catch (e) {
      title = "Untitled Outfit";
      summary = args.summary;
    }
    await ctx.db.patch(args.outfitId as Id<"outfit">, {
      preview_images: args.previewImageId,
      title,
      summary,
      status: "done",
    });
  },
});

// Get data URL from image URL
export const getOutfitById = query({
  args: {
    outfitId: v.string(),
  },
  handler: async (ctx, args) => {
    const outfit = await ctx.db
      .query("outfit")
      .filter((q) => q.eq(q.field("_id"), args.outfitId))
      .collect();
    return outfit[0] || null;
  },
});

export const getOutfitsByWardrobeId = query({
  args: {
    wardrobeId: v.string(),
  },
  handler: async (ctx, args) => {
    const outfits = await ctx.db
      .query("outfit")
      .filter((q) => q.eq(q.field("wardrobeId"), args.wardrobeId))
      .collect();
    return outfits || [];
  },
});
