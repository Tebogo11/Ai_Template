import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const contactUsMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, { name, email, subject, message }) => {
    // Handle the contact form submission
    const newMessage = await ctx.db.insert("contactUsMessage", {
      name,
      email,
      subject,
      message,
    });
    return newMessage;
  },
});
