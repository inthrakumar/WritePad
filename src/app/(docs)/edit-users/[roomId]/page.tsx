'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getRoom } from '@/utils/RoomUtils';
import { setLiveBlocksRoom } from '@/store/slice/LiveBlocksRoomSlice';
import { useSelector } from 'react-redux';
import UserAccessList from '@/scenes/EditUsers';
import { RoomData } from '@liveblocks/node';
type Props = {};

const Page = (props: Props) => {
  const params = useParams();
  const roomId = Array.isArray(params.roomId)
    ? params.roomId[0]
    : params.roomId;
  const [isLoading, setLoading] = useState(true);
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const roomDetails = await getRoom({ roomId });
        setRoomData(roomDetails);
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
  if (!roomData) return <div>There is no Room Data</div>;
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        <UserAccessList roomData={roomData!} />
      </div>
    </div>
  );
};

export default Page;
