import { mutation, query } from "../_generated/server";

export const invokingToken = mutation({
  args: {},
  handler: async (ctx) => {
    try {
      const clerkUser = await ctx.auth?.getUserIdentity();
      console.log("Clerk User:", clerkUser);
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("clerkId"), clerkUser?.subject))
        .collect();
      console.log("User Record:", user);
      if (user.length === 0) {
        throw new Error("User not found");
      }
      ctx.db.patch(user[0]._id, { credits: user[0].credits - 20 });
      return true;
    } catch (error) {
      console.error("Error invoking token:", error);
      throw error;
    }
  },
});

export const hasTokenLeft = query({
  args: {},
  handler: async (ctx) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("clerkId"), clerkUser?.subject))
      .collect();
    if (user.length === 0) {
      throw new Error("User not found");
    }
    return user[0].credits > 0;
  },
});
