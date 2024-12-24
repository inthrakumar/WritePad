'use client';
import ListContents from '@/scenes/ListContents';
import React, { useEffect, useState } from 'react';
import CreateRoomForm from '@/scenes/CreateRoomForm';
import { BreadCrumbs } from '@/scenes/ContentBreadCrumbs';
import { usePathname } from 'next/navigation';
import { folderContents } from '@/types/types';
function page() {
    const [data, setData] = useState<folderContents | null>(null);

    function toTitleCase(str: string) {
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetch(
                    `/api/foldercontents?folderName=${encodeURIComponent(pathname)}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (fetchedData.ok) {
                    const data = await fetchedData.json();
                    console.log(data);
                    setData(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [pathname]);
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
                <ListContents folderdata={data} />
            </div>
        </div>
    );
}

export default page;
