import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  wardrobe: defineTable({
    title: v.string(),
    user_id: v.string(),
  }),
  outfit: defineTable({
    modal: v.optional(v.string()),
    accessories: v.array(v.string()),
    style_intensity: v.number(),
    formality: v.number(),
    initial_prompt: v.string(),
    preview_images: v.optional(v.string()),
    title: v.optional(v.string()),
    summary: v.optional(v.string()),
    is_new_outfit: v.optional(v.boolean()),
    status: v.optional(
      v.union(v.literal("error"), v.literal("generating"), v.literal("done")),
    ),
    season: v.optional(
      v.union(
        v.literal("spring"),
        v.literal("summer"),
        v.literal("autumn"),
        v.literal("winter"),
      ),
    ),
    wardrobeId: v.id("wardrobe"),
  }),
  files: defineTable({
    storageId: v.string(), // same ID as used in variations
    refCount: v.number(),
    softDeleted: v.optional(v.union(v.null(), v.number())),
  }),
});
