'use client';

import React, { useEffect, useState } from 'react';
import { folderContents } from '@/types/types';
import CreateRoomForm from '@/scenes/CreateRoomForm';
import { BreadCrumbs } from '@/scenes/ContentBreadCrumbs';
import { usePathname } from 'next/navigation';
import { UserRecordsExplorer } from '@/scenes/folder/drive';
import { toTitleCase } from '@/utils/AnonymousUtils';
const DocPage = () => {
    const url = usePathname();
    const [data, setData] = useState<folderContents | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const segments = decodeURIComponent(url).split('/').filter(Boolean);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const path = encodeURIComponent(url);
                console.log(path);
                const fetchedData = await fetch(
                    `/api/foldercontents?folderName=${decodeURIComponent(url)}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (fetchedData.ok) {
                    const data = await fetchedData.json();
                    setData(data);

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
        return <div>Loading...</div>;
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
                <UserRecordsExplorer
                    isShared={false}
                    totalpages={1}
                    page={0}
                    setPage={(page: number) => { }}
                    data={data!}
                />
            </div>
        </div>
    );
};

export default DocPage;
