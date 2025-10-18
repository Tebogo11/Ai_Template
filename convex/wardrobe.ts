import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const changeTitle = mutation({
  args: { title: v.string(), wardrobeId: v.string() },
  handler: async (ctx, args) => {
    const { title, wardrobeId } = args;
    // Your logic to create a wardrobe goes here
    await ctx.db.patch(wardrobeId as Id<"wardrobe">, { title });
  },
});
