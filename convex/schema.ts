import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  outfit: defineTable({
    modal: v.string(),
    accessories: v.array(v.string()),
    style_intensity: v.number(),
    formality: v.number(),
    initial_prompt: v.string(),
    preview_images: v.optional(v.array(v.string())),
    summary: v.optional(v.string()),
    is_new_outfit: v.optional(v.boolean()),
    season: v.optional(
      v.union(
        v.literal("Spring"),
        v.literal("Summer"),
        v.literal("Autumn"),
        v.literal("Winter"),
      ),
    ),
  }),
});
