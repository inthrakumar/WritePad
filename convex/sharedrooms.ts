import { query, QueryCtx } from './_generated/server';
import { v } from 'convex/values';

export const sharedRooms = query({
  args: { userid: v.string() },
  handler: async (ctx, args) => {
    const sharedRooms = await ctx.db
      .query('sharedRooms')
      .filter((q) => q.eq(q.field('userid'), args.userid))
      .collect();
    return { success: true, data: sharedRooms };
  },
});
