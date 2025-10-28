import { query } from "../_generated/server";

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("clerkId"), clerkUser?.subject))
      .collect();
    return user[0];
  },
});
