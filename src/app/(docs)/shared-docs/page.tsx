'use client';

import React, { useEffect, useState } from 'react';
import { folderContents } from '@/types/types';
import CreateRoomForm from '@/scenes/CreateRoomForm';
import { UserRecordsExplorer } from '@/scenes/folder/drive';
import { getSharedRooms } from '@/utils/RoomUtils';
import { useUser } from '@clerk/clerk-react';
import EmptyState from '@/scenes/NullComponent';
import Spinner from '@/scenes/Spinner';
const DocPage = () => {
    const userId = useUser().user?.emailAddresses[0].emailAddress;
    const [data, setData] = useState<folderContents | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [totalpages, setTotalPages] = useState<number>(1);
    const [isEmpty, setisEmpty] = useState(false);
    const handleEmpty = ()=>{
        setisEmpty(true);
    }
    const handlePage = (page:number)=>{
        setPage(page);    
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) return;
                const response = await getSharedRooms(userId!, page);
                if (response.status) {
                    if(response.sharedRooms.length==0){
                        setisEmpty(true);
                    }
                    setData({
                        success: true,
                        data: response.sharedRooms,
                    });
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
          
            <div className="flex w-full items-center gap-8 flex-col justify-center">
                <div className="text-3xl">Shared Rooms</div>
            </div>
            {!isLoaded && !data && <Spinner/>}
            {isLoaded && isEmpty ? (
                <div className="w-full">
                    <UserRecordsExplorer
                        page={page}
                        totalpages={totalpages}
                        isShared={true}
                        data={data!}
                        setEmpty={handleEmpty}
                        setPage={handlePage}
                    />
                </div>
            ):<EmptyState message='No Shared Files As Of Now' sidemessage='Ask the Owner Of The File To Grant Permission'/>}
        </div>
    );
};

export default DocPage;
