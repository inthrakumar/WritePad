'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getRoom } from '@/utils/RoomUtils';
import { setLiveBlocksRoom } from '@/store/slice/LiveBlocksRoomSlice';

type Props = {};

const Page = (props: Props) => {
  const params = useParams();
  const roomId = Array.isArray(params.roomId)
    ? params.roomId[0]
    : params.roomId;
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const roomDetails = await getRoom({ roomId });
        dispatch(setLiveBlocksRoom(roomDetails));
      } catch (error) {
        console.error('Error fetching room details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [roomId, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return <div>Page Loaded</div>;
};

export default Page;
