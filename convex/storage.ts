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
  handler: async (ctx, args) => {
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
