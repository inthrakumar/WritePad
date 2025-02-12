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
        const folders = await ctx.db
            .query('userRecords')
            .withIndex('by_room_id', (q) => q.eq('roomId', args.roomId))
            .collect();
        return { success: true, data: folders };
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

export const DeleteFolder = mutation({
    args: {
        id: v.id('userRecords'),
        url: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);

        const childRooms = await ctx.db
            .query('userRecords')
            .filter((q) => q.eq(q.field('parent'), args.url))
            .collect();
        const childIds = [];
        for (const child of childRooms) {
            childIds.push(child.roomId);
            await ctx.db.delete(child._id);
        }
        return {
            status: true,
            childIds,
        };
    },
});

export const DeleteFile = mutation({
    args: {
        id: v.id('userRecords'),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);

        return {
            success: true,
        };
    },
});

export const MoveFile = mutation({
    args: {
        id: v.id('userRecords'),
        parenturl: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            parent: args.parenturl,
        });
        return { success: true };
    },
});

export const MoveFolder = mutation({
    args: {
        id: v.id('userRecords'),
        parenturl: v.string(),
        oldfileurl: v.string(),
        newfileurl: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            parent: args.parenturl,
        });
        const childRooms = await ctx.db
            .query('userRecords')
            .filter((q) => q.eq(q.field('parent'), args.oldfileurl))
            .collect();
        for (const child of childRooms) {
            await ctx.db.patch(child._id, {
                parent: args.newfileurl,
            });
        }
        return { success: true };
    },
});

export const AddSharedRooms = mutation({
    args: {
        userIds: v.array(v.string()),
        roomId: v.string(),
    },
    async handler(ctx, args) {
        for (const id of args.userIds) {
            const sharedfiles = await ctx.db
                .query('sharedRooms')
                .withIndex('user_id', (q) => q.eq('userId', id))
                .collect();
            if (!sharedfiles) {
                await ctx.db.insert('sharedRooms', {
                    userId: id,
                    sharedRooms: [args.roomId],
                });
            } else {
                const roomIds = sharedfiles[0].sharedRooms;
                await ctx.db.patch(sharedfiles[0]._id, {
                    sharedRooms: [id, ...roomIds],
                });
            }
        }
        return {
            status: true,
        };
    },
});

export const GetSharedRooms = query({
    args: {
        userId: v.string(),
        page: v.number(),
    },
    async handler(ctx, args) {
        const sharedfiles = await ctx.db
            .query('sharedRooms')
            .withIndex('user_id', (q) => q.eq('userId', args.userId))
            .collect();
        if (!sharedfiles) {
            return {
                status: false,
                message: 'No Shared Rooms for the user',
            };
        }
        const rooms = sharedfiles[0].sharedRooms;
        const indx = (args.page - 1) * 10;
        const paginatedRooms = rooms.slice(indx, indx + 11);
        return {
            status: true,
            rooms: paginatedRooms,
            totalPages: rooms.length,
        };
    },
});
