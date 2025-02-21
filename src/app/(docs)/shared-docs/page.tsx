'use client';

import React, { useEffect, useState } from 'react';
import { folderContents } from '@/types/types';
import CreateRoomForm from '@/scenes/CreateRoomForm';
import { UserRecordsExplorer } from '@/scenes/folder/drive';
import { getSharedRooms } from '@/utils/RoomUtils';
import { useUser } from '@clerk/clerk-react';
const DocPage = () => {
  const userId = useUser().user?.emailAddresses[0].emailAddress;
  const [data, setData] = useState<folderContents | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;
        const response = await getSharedRooms(userId!, page);
        if (response.status) {
          console.log(response);
          setData(response.sharedRooms);
          setTotalPages(response.totalpages);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page, userId]);
  return (
    <div className="w-[100vw] flex gap-8 flex-col items-center justify-around p-5 pr-7">
      <div className="flex items-end w-full">
        <CreateRoomForm />
      </div>
      <div className="flex w-full items-center gap-8 flex-col justify-center">
        <div className="text-3xl">Shared Rooms</div>
      </div>
      {isLoaded && (
        <div className="w-full">
          <UserRecordsExplorer
            page={page}
            totalpages={totalpages}
            setPage={(page) => setPage(page)}
            isShared={false}
            data={data!}
          />
        </div>
      )}
      {!isLoaded && <div>Loading...</div>}
    </div>
  );
};

export default DocPage;
