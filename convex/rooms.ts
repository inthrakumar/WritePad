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
export const checkRoom = query({
  args: { roomId: v.string() },
  handler: async (ctx, args) => {
    const isRoom = await ctx.db
      .query('userRecords')
      .withIndex('by_room_id', (q) => q.eq('roomId', args.roomId))
      .collect();
    const success = isRoom.length == 0 ? false : true;
    if (success) {
      return {
        success: true,
        roomDetails: isRoom,
      };
    } else {
      return {
        status: false,
      };
    }
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
    const folderExists = await ctx.db.get(args.id);
    if (!folderExists) {
      return { status: false, message: 'Folder does not exist.' };
    }
    await ctx.db.delete(args.id);
    const childRooms = await ctx.db
      .query('userRecords')
      .filter((q) => q.eq(q.field('parent'), args.url))
      .collect();
    async function deleteChildRecords(
      childRecords: typeof childRooms,
      url: string
    ) {
      for (const child of childRecords) {
        if (child.type === 'folder') {
          const updatedurl = `${url}/${encodeURIComponent(child.roomTitle)}`;
          await deleteChildRecords(
            await ctx.db
              .query('userRecords')
              .filter((q) => q.eq(q.field('parent'), url))
              .collect(),
            updatedurl
          );
        }
        const existingDoc = await ctx.db.get(child._id);
        if (existingDoc) {
          await ctx.db.delete(child._id);
        }
      }
    }
    await deleteChildRecords(childRooms, args.url);
    return {
      status: true,
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
    await ctx.db.patch(args.id, { parent: args.parenturl });

    async function moveChildRecords(oldPath: string, newPath: string) {
      const children = await ctx.db
        .query('userRecords')
        .filter((q) => q.eq(q.field('parent'), oldPath))
        .collect();

      for (const child of children) {
        const updatedPath = `${newPath}/${encodeURIComponent(child.roomTitle)}`;
        await ctx.db.patch(child._id, { parent: newPath });

        if (child.type === 'folder') {
          await moveChildRecords(
            `${oldPath}/${encodeURIComponent(child.roomTitle)}`,
            updatedPath
          );
        }
      }
    }

    await moveChildRecords(args.oldfileurl, args.newfileurl);

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
      if (sharedfiles.length == 0) {
        await ctx.db.insert('sharedRooms', {
          userId: id,
          sharedRooms: [args.roomId],
        });
      } else {
        const roomIds = sharedfiles[0].sharedRooms;
        if (!roomIds.includes(args.roomId)) {
          await ctx.db.patch(sharedfiles[0]._id, {
            sharedRooms: [args.roomId, ...roomIds],
          });
        }
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
    if (sharedfiles.length === 0) {
      return {
        status: false,
        message: 'No Shared Rooms for the user',
        rooms: [],
      };
    }

    const rooms = sharedfiles[0].sharedRooms;
    const indx = (args.page - 1) * 10;
    const paginatedRooms = rooms.slice(indx, indx + 10);
    const roomDetails = await Promise.all(
      paginatedRooms.map(async (roomId) => {
        const room = await ctx.db
          .query('userRecords')
          .withIndex('by_room_id', (q) => q.eq('roomId', roomId))
          .collect();
        return room[0];
      })
    );

    return {
      status: true,
      rooms: roomDetails,
      totalPages: Math.ceil(rooms.length / 10),
    };
  },
});
export const RemoveSharedUsers = mutation({
  args: {
    userId: v.string(),
    roomId: v.string(),
  },
  async handler(ctx, args) {
    const sharedfiles = await ctx.db
      .query('sharedRooms')
      .withIndex('user_id', (q) => q.eq('userId', args.userId))
      .collect();
    if (sharedfiles.length == 0) {
      return {
        status: false,
        message: 'No Shared Rooms for the user',
      };
    }
    const roomIds = sharedfiles[0].sharedRooms;

    const filteredRooms = roomIds.filter((room) => room != args.roomId);
    await ctx.db.patch(sharedfiles[0]._id, {
      sharedRooms: filteredRooms,
    });
    return {
      status: true,
    };
  },
});
