'use client';
import React, { useEffect, useState } from 'react';
import { folderContents } from '@/types/types';
import CreateRoomForm from '@/scenes/CreateRoomForm';
import { BreadCrumbs } from '@/scenes/ContentBreadCrumbs';
import { usePathname } from 'next/navigation';
import { UserRecordsExplorer } from '@/scenes/folder/drive';
import { toTitleCase } from '@/utils/AnonymousUtils';
import EmptyState from '@/scenes/NullComponent';
import Spinner from '@/scenes/Spinner';
import { getFolderContents } from '@/utils/DocumentsUtils';
const DocPage = () => {
  const url = usePathname();
  const [data, setData] = useState<folderContents | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const segments = decodeURIComponent(url).split('/').filter(Boolean);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFolderContents(url);
        if (response.status) {
          setData(response.data);
          setIsLoaded(true);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [url]);
    if (!isLoaded) {
    return <Spinner/>;
  }
  return (
    <div className="w-[100vw] flex gap-8 flex-col items-center justify-around p-5 pr-7">
      <div className="flex items-end w-full">
        <CreateRoomForm />
      </div>
      <div className="flex w-full items-center gap-8 flex-col justify-center">
        <div className="text-3xl">
          {toTitleCase(segments[segments.length - 1])}
        </div>
        <BreadCrumbs />
      </div>
      <div className="w-full">
        {data && data.data.length != 0 ? (
          <UserRecordsExplorer
            isShared={false}
            totalpages={1}
            page={0}
            setPage={(page: number) => {}}
            data={data!}
          />
        ) : (
          <EmptyState
            message="No File Available"
            sidemessage="Please create a file to get started."
          />
        )}
      </div>
    </div>
  );
};

export default DocPage;
