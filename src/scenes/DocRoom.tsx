'use client';

import Spinner from './Spinner';
import React, { useState, useEffect } from 'react';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { getRoom } from '@/utils/RoomUtils';
import { useDispatch } from 'react-redux';
import { setLiveBlocksRoom } from '@/store/slice/LiveBlocksRoomSlice';
import LiveCursorProvider from './cursor/LiveCursors';
type Proptypes = {
  roomId: string;
  children: React.ReactNode;
};

const DocRoom = ({ roomId, children }: Proptypes) => {
  const [isAvailable, setisAvailable] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const roomUserDetails = async () => {
      try {
        const roomMetadata = await getRoom({ roomId });
        if (!roomMetadata.success) {
          setisAvailable(false);
        } else {
          dispatch(setLiveBlocksRoom(roomMetadata.roomDetails));
        }
      } catch (error) {
        console.error('Error fetching room metadata:', error);
      }
    };

    if (roomId) {
      roomUserDetails();
    }
  }, [roomId, dispatch]);
  if (isAvailable == false) {
    <div>This file is not available</div>;
  }
  return (
    <RoomProvider
      id={roomId!}
      initialPresence={{
        cursor: {
          x: 0,
          y: 0,
        },
        status: 'online',
      }}
    >
      <ClientSideSuspense fallback={<Spinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default DocRoom;
