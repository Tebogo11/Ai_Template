import { v } from 'convex/values';
import { query } from '../../_generated/server';
import { Id } from '../../_generated/dataModel';

// Get Outfit details by ID
export const getPreviewImage = query({
  args: { outfitId: v.optional(v.id('outfit')) },
  handler: async (ctx, args) => {
    const outfitId = args.outfitId;
    if (!outfitId) return null;
    const preview = await ctx.db
      .query('previewImage')
      .withIndex('by_outfitId', (q) => q.eq('outfitId', outfitId))
      .order('desc')
      .take(1);

    if (!preview[0] || !preview[0].imageUrl) return null;
    return await ctx.storage.getUrl(preview[0].imageUrl as Id<'_storage'>);
  },
});

// Get all preview images for a wardrobe
export const getAllPreviewImages = query({
  args: { wardrobeId: v.id('wardrobe') },
  handler: async (ctx, args) => {
    const wardrobeId = args.wardrobeId;

    // Get all outfits for the wardrobe
    const outfits = await ctx.db
      .query('outfit')
      .withIndex('by_wardrobeId', (q) => q.eq('wardrobeId', wardrobeId))
      .collect();

    const results = [];

    // Get preview images for each outfit
    for (const outfit of outfits) {
      const previews = await ctx.db
        .query('previewImage')
        .withIndex('by_outfitId', (q) => q.eq('outfitId', outfit._id))
        .order('desc')
        .take(1);

      if (previews[0] && previews[0].imageUrl) {
        const imageUrl = await ctx.storage.getUrl(previews[0].imageUrl as Id<'_storage'>);
        results.push({
          imageUrl,
          outfitId: outfit._id,
        });
      }
    }

    return results;
  },
});
