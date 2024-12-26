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
    args: { roomId: v.string() },
    handler: async (ctx, args) => {
        const userRooms = await ctx.db
            .query('userRecords')
            .withIndex('by_room_id', (q) => q.eq('roomId', args.roomId))
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

export const UpdateTitle = mutation({
    args: { id: v.id('userRecords'), title: v.string() },
    handler: async (ctx, args) => {
        const updatedRoom = await ctx.db.patch(args.id, {
            roomTitle: args.title,
        });
        return { success: true, data: updatedRoom };
    },
});

export const DeleteRoom = mutation({
    args: {
        id: v.id('userRecords'),
        isFolder: v.boolean(),
        url: v.string(),
    },
    handler: async (ctx, args) => {
         await ctx.db.delete(args.id);

        if (args.isFolder) {
            const childRooms = await ctx.db
                .query('userRecords')
                .filter((q) => q.eq(q.field('parent'), args.url))
                .collect();
            const  childIds=[];
            for (const child of childRooms) {
                childIds.push(child.roomId);
                await ctx.db.delete(child._id);
            }
            return {
                status:true,
                childIds
            }
        }

        return {
            success: true,
        };
    },
});
