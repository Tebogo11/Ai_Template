import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// Function should check if stoarageId exists in files table and increment refCount if yes and insert new row if not
export const upsertFile = internalMutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingFile = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("storageId"), args.storageId))
      .first();

    if (existingFile) {
      // Increment refCount if file exists
      await ctx.db.patch(existingFile._id, {
        refCount: existingFile.refCount + 1,
      });
    } else {
      // Insert new file record if it doesn't exist
      await ctx.db.insert("files", {
        storageId: args.storageId,
        refCount: 1,
        softDeleted: null,
      });
    }
  },
});

// Function to decrement refCount and soft delete if refCount reaches 0
export const decrementFileRefCount = internalMutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingFile = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("storageId"), args.storageId))
      .first();

    if (existingFile) {
      if (existingFile.refCount > 1) {
        // Decrement refCount if greater than 1
        await ctx.db.patch(existingFile._id, {
          refCount: existingFile.refCount - 1,
        });
      } else {
        // Soft delete if refCount is 1
        await ctx.db.patch(existingFile._id, {
          refCount: 0,
          softDeleted: Date.now(),
        });
      }
    }
  },
});
