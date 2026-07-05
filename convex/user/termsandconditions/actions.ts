import { mutation, query } from '../../_generated/server';

export const hasAcceptedTerms = query({
  args: {},
  handler: async (ctx) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    if (clerkUser?.subject === undefined) {
      return true;
    }
    const users = await ctx.db
      .query('user')
      .filter((q) => q.eq(q.field('clerkId'), clerkUser?.subject))
      .collect();
    const user = users[0];

    // Avoid blocking the UI if the auth identity exists before the user record is created.
    if (!user) {
      return true;
    }

    const hasAccepted = await ctx.db
      .query('hasAcceptedTerms')
      .filter((q) => q.eq(q.field('id'), user._id))
      .collect();

    return hasAccepted.length > 0;
  },
});

export const acceptTerms = mutation({
  args: {},
  handler: async (ctx) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    if (clerkUser?.subject === undefined) {
      throw new Error('User not authenticated');
    }

    const users = await ctx.db
      .query('user')
      .filter((q) => q.eq(q.field('clerkId'), clerkUser?.subject))
      .collect();
    const user = users[0];

    if (!user) {
      throw new Error('User record not found');
    }

    const hasAccepted = await ctx.db
      .query('hasAcceptedTerms')
      .filter((q) => q.eq(q.field('id'), user._id))
      .collect();

    if (hasAccepted.length === 0) {
      await ctx.db.insert('hasAcceptedTerms', { id: user._id });
    }

    return true;
  },
});
