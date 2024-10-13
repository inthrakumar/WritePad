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
}: {
  userId: string;
  email: string;
  title: string;
}) => {
  const roomId = nanoid();

  try {
    const data = {
      owner: userId,
      email: email,
      title: title,
    };

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'],
    };
    const roomDetails = await liveblocks_connection.createRoom(roomId, {
      usersAccesses,
      defaultAccesses: [],
      metadata: data,
    });
    const convexRoom = await convex_connection.mutation(api.rooms.createRoom, {
      roomTitle: title,
      roomId,
      userid: userId,
    });
    revalidatePath(`/`);
    return JSON.parse(JSON.stringify(roomDetails));
  } catch (error) {
    return null;
  }
};

export { CreateRoom };
