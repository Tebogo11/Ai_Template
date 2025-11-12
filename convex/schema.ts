import { error } from "console";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

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
      v.literal("basic"),
      v.literal("pro"),
      v.literal("none"),
      v.literal("free"),
    ),
    credits: v.number(),
    nextCreditCheck: v.optional(v.string()),
  }),
  wardrobe: defineTable({
    title: v.string(),
    user_id: v.string(),
  }),
  outfit: defineTable({
    modal: v.optional(v.string()),
    accessories: v.array(v.object({ storageId: v.string() })),
    style_theme: v.optional(v.array(v.string())),
    initial_prompt: v.string(),
    preview_images: v.optional(v.string()),
    title: v.optional(v.string()),
    summary: v.optional(v.string()),
    is_new_outfit: v.optional(v.boolean()),
    status: v.optional(
      v.union(v.literal("error"), v.literal("generating"), v.literal("done")),
    ),
    error: v.optional(v.string()),

    fit: v.optional(
      v.union(
        v.literal("bodyCon"),
        v.literal("tailored"),
        v.literal("standardFit"),
        v.literal("relaxed"),
        v.literal("oversized"),
      ),
    ),
    wardrobeId: v.id("wardrobe"),
  }),
});
