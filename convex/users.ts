import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertUsers = mutation({
  args: {
    userid: v.string(),
    username: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { userid, username, email }) => {
    await ctx.db.insert("users", {
      userid,
      username,
      email,
    });

    return { success: true };
  },
});
