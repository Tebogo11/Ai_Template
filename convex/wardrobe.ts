import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

export const changeTitle = mutation({
  args: { title: v.string(), wardrobeId: v.string() },
  handler: async (ctx, args) => {
    const { title, wardrobeId } = args;
    // Your logic to create a wardrobe goes here
    await ctx.db.patch(wardrobeId as Id<"wardrobe">, { title });
  },
});

export const deleteWardrobe = mutation({
  args: { wardrobeId: v.string() },
  handler: async (ctx, args) => {
    const { wardrobeId } = args;
    const outfits = await ctx.db
      .query("outfit")
      .filter((q) => q.eq(q.field("wardrobeId"), wardrobeId))
      .collect();

    for (const outfit of outfits) {
      await ctx.runMutation(api.outfit.deleteOutfitById, {
        outfitId: outfit._id,
      });
    }
    await ctx.db.delete(wardrobeId as Id<"wardrobe">);
    //Not complete
  },
});
