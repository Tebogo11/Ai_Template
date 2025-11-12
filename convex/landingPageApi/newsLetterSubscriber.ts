import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const subscribeToNewsletter = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const existingSubscriber = await ctx.db
      .query("newsletterSubscriber")
      .filter((q) => q.eq("email", email))
      .first();
    if (existingSubscriber) {
      return existingSubscriber;
    }
    const newSubscriber = await ctx.db.insert("newsletterSubscriber", {
      email,
      subscribedAt: new Date().toISOString(),
    });

    return newSubscriber;
  },
});
