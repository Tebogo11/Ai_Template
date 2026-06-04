import { paginationOptsValidator } from 'convex/server';
import { query } from '../_generated/server';
import { v } from 'convex/values';

export const getAllWardrobesByUserId = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const user = await ctx.auth?.getUserIdentity();
    if (!user) throw new Error('Authentication required');
    const wardrobes = await ctx.db
      .query('wardrobe')
      .filter((q) => q.eq(q.field('user_id'), user.subject || 'anonymous'))
      .order('desc')
      .paginate(args.paginationOpts);
    return wardrobes;
  },
});

export const isEmptyWardrobe = query({
  args: { wardrobeId: v.union(v.string(), v.null()) },
  handler: async (ctx, args) => {
    if (!args.wardrobeId) return true; // Consider a non-existent wardrobe as empty
    const outfits = await ctx.db
      .query('outfit')
      .filter((q) => q.eq(q.field('wardrobeId'), args.wardrobeId))
      .collect();
    return outfits.length === 0;
  },
});
