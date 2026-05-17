import { paginationOptsValidator } from 'convex/server';
import { query } from '../_generated/server';

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
