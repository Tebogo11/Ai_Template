import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const generateDataType = {
  modal: v.string(),
  accessories: v.array(v.object({ storageId: v.string() })),
  fit: v.optional(
    v.union(
      v.literal("slimAndSharp"),
      v.literal("bodyCon"),
      v.literal("tailored"),
      v.literal("standardFit"),
      v.literal("relaxed"),
      v.literal("oversized"),
      v.literal("flowing"),
    ),
  ),
  amount_of_change: v.optional(
    v.union(
      v.literal("None"),
      v.literal("Light"),
      v.literal("Moderate"),
      v.literal("Major"),
      v.literal("Complete"),
    ),
  ),
  event: v.optional(
    v.union(
      v.literal("casual"),
      v.literal("creative_workspace"),
      v.literal("corporate"),
      v.literal("date_night"),
      v.literal("party"),
      v.literal("formal"),
      v.literal("editorial"),
    ),
  ),
  themes: v.optional(v.array(v.string())),
  style_theme: v.optional(v.array(v.string())),
  initial_prompt: v.string(),
  generation_mode: v.optional(
    v.union(v.literal("improve_only"), v.literal("style_transfer")),
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
    const themes = args.themes ?? args.style_theme ?? [];
    const normalizedPrompt = args.initial_prompt?.trim() || "";
    const hasCustomInput =
      args.accessories.length > 0 ||
      themes.length > 0 ||
      normalizedPrompt.length > 0 ||
      (args.amount_of_change && args.amount_of_change !== "None") ||
      (args.event && args.event !== "casual") ||
      (args.fit && args.fit !== "relaxed");
    const generationMode =
      args.generation_mode ??
      (hasCustomInput ? "style_transfer" : "improve_only");

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
      fit: args.fit,
      amount_of_change: args.amount_of_change,
      event: args.event,
      themes,
      style_theme: args.style_theme ?? themes,
      initial_prompt: normalizedPrompt,
      generation_mode: generationMode,
      status: "generating",
      wardrobeId: finalWardrobeId,
    });
    const { title, wardrobeId, ...rest } = args;
    await ctx.scheduler.runAfter(0, internal.aiSystem.generatePreviewWithAI, {
      ...rest,
      themes,
      initial_prompt: normalizedPrompt,
      generation_mode: generationMode,
      outfitId,
    });
    return { outfitId, wardrobeId: finalWardrobeId, title: args.title };
  },
});

export const generationWentWrong = mutation({
  args: {
    outfitId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.outfitId as Id<"outfit">, {
      status: "error",
      error: "Generation failed",
    });
  },
});

export const updateOutfitPreview = mutation({
  args: {
    outfitId: v.string(),
    previewImageId: v.string(),
    summary: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      let title = "";
      let summary = "";
      console.log(
        "[Function]: Updating outfit preview Args:",
        args.outfitId,
        args.previewImageId,
        args.summary,
      );

      if (args.summary) {
        const [tempTitle, tempTitleDescription] = args.summary
          .split("|")
          .map((s) => s.trim());

        title = tempTitle || "Untitled Outfit";
        summary = tempTitleDescription || args.summary;
      }

      await ctx.db.patch(args.outfitId as Id<"outfit">, {
        preview_images: args.previewImageId,
        title,
        summary,
        status: "done",
      });
    } catch (error) {
      console.error("[Error]: Failed to update outfit preview:", error);
      await ctx.db.patch(args.outfitId as Id<"outfit">, {
        status: "error",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      throw error;
    }
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
    wardrobeId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.wardrobeId) return [];
    const outfits = await ctx.db
      .query("outfit")
      .filter((q) => q.eq(q.field("wardrobeId"), args.wardrobeId))
      .collect();
    return outfits || [];
  },
});

export const getRecentOutfitByWardrobeId = query({
  args: {
    wardrobeId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.wardrobeId) return null;
    const outfits = await ctx.db
      .query("outfit")
      .filter((q) => q.eq(q.field("wardrobeId"), args.wardrobeId))
      .order("desc")
      .take(1);

    return outfits[0] || null;
  },
});

export const deleteOutfitById = mutation({
  args: {
    outfitId: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.outfitId) return null;
    const outfit = await ctx.db
      .query("outfit")
      .filter((q) => q.eq(q.field("_id"), args.outfitId))
      .take(1);
    const currentOutfit = outfit[0];
    if (!currentOutfit) return null;

    if (currentOutfit?.preview_images) {
      await ctx.runMutation(api.storage.deleteImage, {
        storageId: currentOutfit.preview_images,
        outfitId: args.outfitId,
        outfitColumnKey: "preview_images",
      });
    }
    if (currentOutfit?.modal) {
      await ctx.runMutation(api.storage.deleteImage, {
        storageId: currentOutfit.modal,
        outfitId: args.outfitId,
        outfitColumnKey: "modal",
      });
    }
    if (currentOutfit?.accessories && currentOutfit.accessories.length > 0) {
      for (const accessory of currentOutfit.accessories) {
        await ctx.runMutation(api.storage.deleteImage, {
          storageId: accessory.storageId,
          outfitId: args.outfitId,
          outfitColumnKey: "accessories",
        });
      }
    }

    return await ctx.db.delete(args.outfitId as Id<"outfit">);
  },
});
