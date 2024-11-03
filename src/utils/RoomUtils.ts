'use server';

import { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import {
  liveblocks_connection,
  convex_connection,
} from '@/config/serverconfig';
import { api } from '../../convex/_generated/api';
import { UpdateTitle } from '../types/types';
const CreateRoom = async ({
  userId,
  email,
  title,
  type,
  parent,
}: {
  userId: string;
  email: string;
  title: string;
  type: string;
  parent: string;
}) => {
  auth().protect();
  const roomId = nanoid();
  try {
    const data = {
      owner: userId,
      email: email,
      title: title,
      isAlive: 'true',
    };
    let roomDetails;
    if (type !== 'folder') {
      const usersAccesses: RoomAccesses = {
        [email]: ['room:write'],
      };
      roomDetails = await liveblocks_connection.createRoom(roomId, {
        usersAccesses,
        defaultAccesses: [],
        metadata: data,
      });
    }

    const convexRoom = await convex_connection.mutation(api.rooms.createRoom, {
      parent: parent,
      roomTitle: title,
      roomId,
      userid: userId,
      type: 'file',
    });
    revalidatePath(`/`);
    return JSON.parse(JSON.stringify(convexRoom));
  } catch (error) {
    return null;
  }
};

const UpdateTitleFn = async ({ roomId, id, title }: UpdateTitle) => {
  auth().protect();
  try {
    await liveblocks_connection.updateRoom(roomId, {
      metadata: {
        title,
      },
    });
    const updatedRoom = await convex_connection.mutation(
      api.rooms.UpdateTitle,
      {
        id: id,
        title: title,
      }
    );
    console.log(updatedRoom);
    revalidatePath(`/`);
    return JSON.parse(JSON.stringify(updatedRoom));
  } catch (error) {
    return null;
  }
};

const getOwnerRooms = async ({ roomId }: { roomId: string }) => {
  auth().protect();
  try {
    const roomDetails = await convex_connection.query(api.rooms.getUserRooms, {
      roomId: roomId,
    });
    return JSON.parse(JSON.stringify(roomDetails));
  } catch (error) {
    console.error(error);
  }
};

const getRoom = async ({ roomId }: { roomId: string }) => {
  auth().protect();
  try {
    const roomDetails = await liveblocks_connection.getRoom(roomId);
    revalidatePath(`/`);
    return JSON.parse(JSON.stringify(roomDetails));
  } catch (error) {
    console.error(error);
  }
};

const updateUserAccess = async ({
  emailList,
  roomId,
  accessType,
}: {
  emailList: string[];
  roomId: string;
  accessType: 'write' | 'read';
}) => {
  auth().protect();

  try {
    const roomDetails = await liveblocks_connection.getRoom(roomId);

    const usersAccesses = roomDetails.usersAccesses;

    emailList.forEach((email) => {
      usersAccesses[email] =
        accessType === 'write'
          ? ['room:write']
          : ['room:read', 'room:presence:write'];
    });
    await liveblocks_connection.updateRoom(roomId, {
      usersAccesses,
    });

    revalidatePath(`/`);

    return usersAccesses;
  } catch (error) {
    console.error('Failed to update user access:', error);
    throw new Error('Error updating user access');
  }
};

export { CreateRoom, UpdateTitleFn, getOwnerRooms, getRoom, updateUserAccess };
