import { v } from 'convex/values';
import { query } from '../_generated/server';
import { Id } from '../_generated/dataModel';

// Get Outfit details by ID
export const getOutfitDetails = query({
  args: { outfitId: v.id('outfit') },
  handler: async (ctx, args) => {
    const outfit = await ctx.db.get(args.outfitId);
    if (!outfit) throw new Error('Outfit not found');

    return outfit;
  },
});

export const getOutfitAdditionalDetails = query({
  args: { outfitId: v.id('outfit') },
  handler: async (ctx, args) => {
    const outfit = await ctx.db.get(args.outfitId);
    if (!outfit) throw new Error('Outfit not found');
    const model = await ctx.db
      .query('model')
      .filter((q) => q.eq(q.field('outfitId'), args.outfitId))
      .first();
    const accessories = await ctx.db
      .query('accessories')
      .filter((q) => q.eq(q.field('outfitId'), args.outfitId))
      .collect();
    return { outfit, model, accessories };
  },
});

export const getRecentOutfitByWardrobeId = query({
  args: {
    wardrobeId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.wardrobeId) return null;
    const recentOutfits = await ctx.db
      .query('outfit')
      .filter((q) => q.eq(q.field('wardrobeId'), args.wardrobeId))
      .order('desc')
      .take(1);

    const outfits = await ctx.db
      .query('outfit')
      .filter((q) =>
        q.and(
          q.eq(q.field('wardrobeId'), args.wardrobeId),
          q.eq(q.field('status'), 'done'),
        ),
      )
      .order('desc')
      .collect();
    console.log('Outfits for wardrobe', args.wardrobeId, outfits);
    return { recentOutfit: recentOutfits[0] || null, outfitCount: outfits.length };
  },
});
