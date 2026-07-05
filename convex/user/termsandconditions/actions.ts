import { v } from 'convex/values';
import { mutation, query } from '../../_generated/server';
import { truncate } from 'fs';

export const hasAcceptedTerms = query({
  args: {},
  handler: async (ctx) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    if (clerkUser?.subject === undefined) {
      return true;
    }
    const user = await ctx.db
      .query('user')
      .filter((q) => q.eq(q.field('clerkId'), clerkUser?.subject))
      .collect();
    const hasAccepted = await ctx.db
      .query('hasAcceptedTerms')
      .filter((q) => q.eq(q.field('id'), user[0]._id))
      .collect();
    return hasAccepted.length > 0;
  },
});

export const acceptTerms = mutation({
  args: {},
  handler: async (ctx) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    if (clerkUser?.subject === undefined) {
      return new Error('User not authenticated');
    }
    const user = await ctx.db
      .query('user')
      .filter((q) => q.eq(q.field('clerkId'), clerkUser?.subject))
      .collect();
    await ctx.db.insert('hasAcceptedTerms', { id: user[0]._id });
    return true;
  },
});
