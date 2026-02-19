import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
    themes: v.optional(v.array(v.string())),
    style_theme: v.optional(v.array(v.string())),
    initial_prompt: v.string(),
    amount_of_change: v.optional(
      v.union(
        v.literal("None"),
        v.literal("Light"),
        v.literal("Moderate"),
        v.literal("Major"),
        v.literal("Complete"),
      ),
    ),
    event: v.optional(
      v.union(
        v.literal("casual"),
        v.literal("creative_workspace"),
        v.literal("corporate"),
        v.literal("date_night"),
        v.literal("party"),
        v.literal("formal"),
        v.literal("editorial"),
      ),
    ),
    generation_mode: v.optional(
      v.union(v.literal("improve_only"), v.literal("style_transfer")),
    ),
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
        v.literal("slimAndSharp"),
        v.literal("bodyCon"),
        v.literal("tailored"),
        v.literal("standardFit"),
        v.literal("relaxed"),
        v.literal("oversized"),
        v.literal("flowing"),
      ),
    ),
    wardrobeId: v.id("wardrobe"),
  }),
});
