import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createRoom = mutation({
  args: {
    parent: v.string(),
    roomTitle: v.string(),
    roomId: v.string(),
    type: v.string(),
    userid: v.string(),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert('userRecords', {
      parent: args.parent,
      roomTitle: args.roomTitle,
      roomId: args.roomId,
      lastEdited: new Date().toISOString(),
      userid: args.userid,
      type: args.type,
    });

    return { success: true, data: roomId };
  },
});

export const getUserRooms = query({
  args: { userid: v.string() },
  handler: async (ctx, args) => {
    const userRooms = await ctx.db
      .query('userRecords')
      .withIndex('user_id', (q) => q.eq('userid', args.userid))
      .collect();
    return { success: true, data: userRooms };
  },
});

export const UpdateLastEdited = mutation({
  args: { id: v.id('userRecords') },
  handler: async (ctx, args) => {
    const updatedRoom = await ctx.db.patch(args.id, {
      lastEdited: new Date().toISOString(),
    });
    return { success: true, data: updatedRoom };
  },
});
