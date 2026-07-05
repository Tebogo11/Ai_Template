import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { hasAcceptedTerms } from './user/termsandconditions/actions';

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
    title: v.optional(v.string()),
    summary: v.optional(v.string()),
    modal: v.optional(v.string()),
    accessories: v.optional(v.array(v.string())),
    fit: v.optional(v.string()),
    event: v.optional(v.string()),
    amount_of_change: v.optional(v.string()),
    themes: v.optional(v.array(v.string())),
    style_theme: v.optional(v.array(v.string())),
    preview_images: v.optional(v.string()),
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
  hasAcceptedTerms: defineTable({
    id: v.id('user'),
  }),
});
