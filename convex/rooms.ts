import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createRoom = mutation({
  args: {
    roomTitle: v.string(),
    roomId: v.string(),

    userid: v.string(),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert('roomDetails', {
      roomTitle: args.roomTitle,
      roomId: args.roomId,
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

export const UpdateLastEdited = mutation({
  args: { id: v.id('roomDetails') },
  handler: async (ctx, args) => {
    const updatedRoom = await ctx.db.patch(args.id, {
      lastEdited: new Date().toISOString(),
    });
    return { success: true, data: updatedRoom };
  },
});
