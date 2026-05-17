import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  newsletterSubscriber: defineTable({
    email: v.string(),
    subscribedAt: v.string(),
  }),
  contactUsMessage: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  }),
  user: defineTable({
    clerkId: v.string(),
    email: v.string(),
    plan: v.union(
      v.literal('basic'),
      v.literal('pro'),
      v.literal('none'),
      v.literal('free'),
    ),
    credits: v.number(),
    nextCreditCheck: v.optional(v.string()),
  }),
  wardrobe: defineTable({
    title: v.string(),
    user_id: v.string(),
  }),
  outfit: defineTable({
    initial_prompt: v.string(),
    is_new_outfit: v.optional(v.boolean()),
    status: v.optional(
      v.union(v.literal('error'), v.literal('generating'), v.literal('done')),
    ),
    error: v.optional(v.string()),
    wardrobeId: v.id('wardrobe'),
  }).index('by_wardrobeId', ['wardrobeId']),
  model: defineTable({
    outfitId: v.id('outfit'),
    storageId: v.string(),
  }).index('by_outfitId', ['outfitId']),
  accessories: defineTable({
    outfitId: v.id('outfit'),
    storageId: v.string(),
  }).index('by_outfitId', ['outfitId']),
  previewImage: defineTable({
    outfitId: v.id('outfit'),
    imageUrl: v.string(),
  }).index('by_outfitId', ['outfitId']),
});
