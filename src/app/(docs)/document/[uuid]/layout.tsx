'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { checkRoom } from '../../../../utils/RoomUtils';
import { useDispatch } from 'react-redux';
import { setRoomDetails } from '../../../../store/slice/RoomSlice';
import Spinner from '@/scenes/Spinner';
import EmptyState from '@/scenes/NullComponent';
export default function DocLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();
  const [isAvailable, setAvailable] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { uuid } = useParams();
  const roomId = uuid?.toString();

  useEffect(() => {
    const FetchRoomDetails = async () => {
      try {
        if (!roomId) return;
        const response = await checkRoom({ roomId });
        if (response?.success) {
          setAvailable(true);
          dispatch(
            setRoomDetails({
              roomId: response.roomDetails[0]?.roomId,
              roomConvexId: response.roomDetails[0]?._id,
              title: response.roomDetails[0]?.roomTitle,
              owner: response.roomDetails[0]?.userid,
            })
          );
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    FetchRoomDetails();
  }, [roomId, dispatch]);

  if (!isLoaded) return <Spinner />;
  if (!isAvailable)
    return (
      <EmptyState
        message="The File is not present"
        sidemessage="Check with the owner for further updates"
      />
    );

  return <div>{children}</div>;
}
