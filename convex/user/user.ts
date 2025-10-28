import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import dayjs from "dayjs";
import { Plans } from "./consts";
// export const getUser = query({
//   args: {},
//   handler: async (ctx) => {
//     const clerkUser = await ctx.auth.getUserIdentity();
//     const user = await ctx.db
//       .query("user")
//       .filter((q) => q.eq(q.field("clerkId"), clerkUser?.subject))
//       .collect();
//     return user;
//   },
// });

export const hasActiveAccountChecker = mutation({
  args: {
    plan: v.union(
      v.literal("basic"),
      v.literal("pro"),
      v.literal("none"),
      v.literal("free"),
    ),
  },
  handler: async (ctx, { plan }) => {
    const clerkUser = await ctx.auth.getUserIdentity();
    if (!clerkUser?.subject) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("clerkId"), clerkUser?.subject))
      .collect();
    console.log("User Record:", user);
    if (user.length === 0) {
      await ctx.db.insert("user", {
        clerkId: clerkUser?.subject,
        email: clerkUser?.email || "",
        plan: "free",
        credits: 200,
        nextCreditCheck: dayjs().add(30, "day").toDate().toDateString(),
      });

      return true;
    } else {
      const nextCheck = dayjs(user[0].nextCreditCheck);
      if (user[0].plan !== plan) {
        await ctx.db.patch(user[0]._id, {
          plan: plan,
          nextCreditCheck: dayjs().add(30, "day").toDate().toDateString(),
          credits: Plans[plan],
        });
        return true;
      }
      if (user[0].plan === "free") {
        console.log("Next Check Date:", nextCheck.toDate());
        if (nextCheck.isBefore(dayjs())) {
          await ctx.db.patch(user[0]._id, {
            credits: 0,
          });
          return false;
        }
        return true;
      } else if (user[0].plan === "basic") {
        if (nextCheck.isBefore(dayjs())) {
          await ctx.db.patch(user[0]._id, {
            credits: 2000,
            nextCreditCheck: dayjs().add(30, "day").toDate().toDateString(),
          });
          return true;
        }
        return true;
      } else if (user[0].plan === "pro") {
        if (nextCheck.isBefore(dayjs())) {
          await ctx.db.patch(user[0]._id, {
            credits: 5000,
            nextCreditCheck: dayjs().add(30, "day").toDate().toDateString(),
          });
          return true;
        }
        return true;
      }
    }
  },
});
