'use server';

import { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import {
  liveblocks_connection,
  convex_connection,
} from '@/config/serverconfig';
import { api } from '../../convex/_generated/api';

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
  const roomId = nanoid();
  try {
    const data = {
      owner: userId,
      email: email,
      title: title,
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

export { CreateRoom };
