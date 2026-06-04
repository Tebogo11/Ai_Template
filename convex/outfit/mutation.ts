import { v } from 'convex/values';
import { internalMutation, mutation } from '../_generated/server';
import { Id } from '../_generated/dataModel';
import { api } from '../_generated/api';

export const saveModelAndAccessories = internalMutation({
  args: {
    outfitId: v.id('outfit'),
    modelStorageId: v.string(),
    accessoriesStorageIds: v.array(v.string()),
  },
  handler: ({ db }, { outfitId, modelStorageId, accessoriesStorageIds }) => {
    db.insert('model', {
      outfitId,
      storageId: modelStorageId,
    });

    accessoriesStorageIds.forEach((storageId) => {
      db.insert('accessories', {
        outfitId,
        storageId,
      });
    });
  },
});

export const deleteOutfitById = mutation({
  args: {
    outfitId: v.id('outfit'),
  },
  handler: async (ctx, args) => {
    if (!args.outfitId) return null;
    const outfit = await ctx.db
      .query('outfit')
      .filter((q) => q.eq(q.field('_id'), args.outfitId))
      .take(1);
    const currentOutfit = outfit[0];
    if (!currentOutfit) return null;

    const previewStorageId = await ctx.db
      .query('previewImage')
      .withIndex('by_outfitId', (q) => q.eq('outfitId', args.outfitId))
      .collect();
    if (previewStorageId[0]) {
      ctx.db.delete(previewStorageId[0]._id);
    }

    const model = await ctx.db
      .query('model')
      .withIndex('by_outfitId', (q) => q.eq('outfitId', args.outfitId))
      .take(1);

    if (model[0]) {
      await ctx.storage.delete(model[0].storageId as Id<'_storage'>);
      ctx.db.delete(model[0]._id);
    }

    const accessories = await ctx.db
      .query('accessories')
      .withIndex('by_outfitId', (q) => q.eq('outfitId', args.outfitId))
      .collect();

    if (accessories.length) {
      for (const accessory of accessories) {
        await ctx.storage.delete(accessory.storageId as Id<'_storage'>);
        ctx.db.delete(accessory._id);
      }
    }

    return await ctx.db.delete(args.outfitId as Id<'outfit'>);
  },
});

export const getFormImages = mutation({
  args: { outfitId: v.optional(v.id('outfit')) },
  returns: v.union(
    v.object({
      modelFinal: v.union(v.string(), v.null()),
      accessories: v.array(
        v.object({
          id: v.string(),
          url: v.string(),
        }),
      ),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const outfitId = args.outfitId;
    if (!outfitId) return null;
    const model = await ctx.db
      .query('model')
      .withIndex('by_outfitId', (q) => q.eq('outfitId', outfitId))
      .take(1);

    if (!model[0] || !model[0].storageId) return null;
    const modelFinal = await ctx.storage.getUrl(model[0].storageId as Id<'_storage'>);

    const accessories = await ctx.db
      .query('accessories')
      .withIndex('by_outfitId', (q) => q.eq('outfitId', outfitId))
      .collect();

    if (!model[0] || !model[0].storageId) return null;
    const accessoriesWithUrls: { id: string; url: string }[] = [];
    for (const accessory of accessories) {
      const imageUrl = await ctx.storage.getUrl(accessory.storageId as Id<'_storage'>);
      if (imageUrl) accessoriesWithUrls.push({ id: accessory._id, url: imageUrl });
    }

    return { modelFinal, accessories: accessoriesWithUrls.reverse() };
  },
});

export const getOutfitDetailsForEdit = mutation({
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
