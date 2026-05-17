import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { Id } from '../_generated/dataModel';
import { internal } from '../_generated/api';

export const generateOutfit = mutation({
  args: {
    modal: v.string(),
    accessories: v.array(v.object({ storageId: v.string() })),
    prompt: v.string(),
    is_new_outfit: v.boolean(),
    wardrobeId: v.optional(v.string()),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const { modal, accessories, prompt, is_new_outfit, wardrobeId } = args;
      // 1. Generate outfit using the provided data
      // This is a placeholder implementation. Replace it with your actual outfit generation logic.

      const user = await ctx.auth?.getUserIdentity();
      if (!user) throw new Error('Authentication required');

      let finalWardrobeId = wardrobeId as Id<'wardrobe'>;
      if (!finalWardrobeId) {
        finalWardrobeId = await ctx.db.insert('wardrobe', {
          user_id: user.subject || 'anonymous',
          title: args.title || 'Untitled Outfit',
        });
      }

      // insert a new outfit record with status 'generating'
      const outfitId = await ctx.db.insert('outfit', {
        initial_prompt: prompt,
        is_new_outfit,
        status: 'generating',
        wardrobeId: finalWardrobeId,
      });

      // Insert model and accessories records
      await ctx.scheduler.runAfter(0, internal.outfit.mutation.saveModelAndAccessories, {
        outfitId,
        modelStorageId: modal,
        accessoriesStorageIds: accessories.map((acc) => acc.storageId),
      });

      // create preview entry
      const previewId = await ctx.db.insert('previewImage', {
        outfitId,
        imageUrl: '', // you can update this later with the actual preview URL
      });

      await ctx.scheduler.runAfter(0, internal.generator.action.generateOutFitWithAI, {
        accessories,
        is_new_outfit,
        modal,
        prompt,
        previewId,
        outfitId,
      });

      return {
        outfitId,
        wardrobeId: finalWardrobeId,
        title: args.title || 'Untitled Outfit',
      };
    } catch (error) {
      console.error('Error generating outfit:', error);
      throw error;
    }
  },
});
