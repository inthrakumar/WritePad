import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createRoom = mutation({
  args: {
    roomTitle: v.string(),
    roomId: v.string(),
    owner: v.string(),
    userid: v.string(),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert('roomDetails', {
      roomTitle: args.roomTitle,
      roomId: args.roomId,
      owner: args.owner,
      lastEdited: new Date().toISOString(),
      userid: args.userid,
    });

    return { success: true, data: roomId };
  },
});

export const getUserRooms = query({
  args: { userid: v.string() },
  handler: async (ctx, args) => {
    const userRooms = await ctx.db
      .query('roomDetails')
      .withIndex('user_id', (q) => q.eq('userid', args.userid))
      .collect();
    return { success: true, data: userRooms };
  },
});
