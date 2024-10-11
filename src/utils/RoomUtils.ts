'use server';

import { Liveblocks, RoomAccesses } from '@liveblocks/node';
import { env_varaibles } from '@/config/envconfig';
import { useToast } from '@/components/ui/use-toast';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
const liveblocks = new Liveblocks({
  secret: env_varaibles.LIVEBLOCKS_SECRET_KEY!,
});

const CreateRoom = async ({
  userId,
  email,
  title,
}: {
  userId: string;
  email: string;
  title: string;
}) => {
  const { toast } = useToast();

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
    const roomDetails = await liveblocks.createRoom(roomId, {
      usersAccesses,
      defaultAccesses: [],
      metadata: data,
    });
    revalidatePath(`/`);
    toast({
      title: 'Room created successfully',
    });
    return JSON.parse(JSON.stringify(roomDetails));
  } catch (error) {
    toast({
      title: 'Error creating room',
    });
    return null;
  }
};
