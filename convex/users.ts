import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const addUsers = mutation({
  args: { username: v.string(), userid: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const userid = await ctx.db.insert('users', {
      username: args.username,
      userid: args.userid,
      email: args.email,
    });
    return { success: true, data: userid };
  },
});

export const fetchUserDetails = query({
  args: { userid: v.string() },
  handler: async (ctx, args) => {
    const userDetails = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('userid'), args.userid))
      .collect();
    return { success: true, data: userDetails };
  },
});
