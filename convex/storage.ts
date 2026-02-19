import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: { storageId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.storageId) return null;
    console.log("Fetching URL for storage ID:", args.storageId);
    return await ctx.storage.getUrl(args.storageId as Id<"_storage">);
  },
});

export const getImageUrlFunc = mutation({
  args: { storageId: v.optional(v.string()) },
  handler: async (ctx, args) =>   {
    if (!args.storageId) return null;
    console.log("Fetching URL for storage ID:", args.storageId);
    return await ctx.storage.getUrl(args.storageId as Id<"_storage">);
  },
});

export const getListImageUrl = mutation({
  args: { storageIdsList: v.optional(v.array(v.string())) },
  handler: async (ctx, args) => {
    if (!args.storageIdsList) return null;
    console.log("Fetching URL for storage IDs:", args.storageIdsList);
    return await Promise.all(
      args.storageIdsList.map((id) => ctx.storage.getUrl(id as Id<"_storage">)),
    );
  },
});

export const deleteImage = mutation({
  args: {
    storageId: v.string(),
    outfitId: v.string(),
    outfitColumnKey: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      if (!args.storageId) return null;
      const currentOutfit = await ctx.db.get(args.outfitId as Id<"outfit">);
      if (!currentOutfit) return null;

      if (args.outfitColumnKey !== "accessories") {
        await ctx.db.patch(args.outfitId as Id<"outfit">, {
          [args.outfitColumnKey]: undefined,
        });
      } else {
        await ctx.db.patch(args.outfitId as Id<"outfit">, {
          accessories: currentOutfit.accessories.filter(
            (acc) => acc.storageId !== args.storageId,
          ),
        });
      }

      try {
        await ctx.storage.delete(args.storageId as Id<"_storage">);
      } catch (storageError) {
        console.error("Error deleting storage:", storageError);
      }
      return true;
    } catch (error) {
      console.error("Error updating outfit:", error);
      return false;
    }
  },
});
