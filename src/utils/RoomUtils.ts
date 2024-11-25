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
import { metadata } from '../app/(auth)/sign-up/[[...sign-up]]/layout';
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
    await liveblocks_connection.updateRoom(roomId, { usersAccesses });
    revalidatePath(`/`);

    await triggerNotifications(emailList, roomId, accessType);

    return usersAccesses;
  } catch (error) {
    console.error('Failed to update user access:', error);
    throw new Error('Error updating user access');
  }
};

const triggerNotifications = async (
  emailList: string[],
  roomId: string,
  accessType: 'write' | 'read'
) => {
  const notificationPromises = emailList.map((email) =>
    liveblocks_connection.triggerInboxNotification({
      userId: email,
      kind:
        accessType === 'write' ? '$writeAccessGranted' : '$readAccessGranted',
      subjectId: roomId,
      activityData: {
        accessType,
        timestamp: Date.now(),
      },
      roomId,
    })
  );

  await Promise.all(notificationPromises);
};

const getSharedRooms = async (userId: string) => {
  console.log(userId);
  auth().protect();

  try {
    const {
      data: sharedRooms,
      nextCursor,
      nextPage,
    } = await liveblocks_connection.getRooms({
      limit: 20,
      userId,
    });
    const filteredsharedRooms = sharedRooms.filter((rooms) => {
      return rooms.metadata.email != userId;
    });

    return JSON.parse(JSON.stringify(filteredsharedRooms));
  } catch (error) {
    console.error('Error fetching shared rooms:', error);
    throw new Error('Failed to fetch shared rooms');
  }
};

export {
  CreateRoom,
  UpdateTitleFn,
  getOwnerRooms,
  getRoom,
  updateUserAccess,
  getSharedRooms,
};
