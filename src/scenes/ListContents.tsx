import { type ReactElement } from 'react';
import { Separator } from '@/components/ui/separator';
import { folderContents } from '@/types/types';
import Link from 'next/link';
export default function ListContents({
    folderdata,
}: {
    folderdata: folderContents | null;
}): ReactElement {
   
    if (!folderdata) {
        return (
            <div className="w-full flex flex-col items-center justify-center">
                <p className="text-gray-500 text-center">No folder data available</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col space-y-4">
            {/* Dynamic Titles */}
            <div className="flex items-center space-x-4 text-sm justify-center"></div>

            <Separator className="my-4" />

            {/* Dynamic Folder Data Section */}
            <div className="flex flex-col">
                {folderdata.map((item) => (
                    <Link href={`/document/${item.roomId}`} key={item.roomId}>
                        <div
                            key={item._id.toString()}
                            className="flex items-center space-x-4 text-sm p-4 hover:cursor-pointer hover:bg-gray-100   rounded-md shadow-sm"
                        >
                            <div className="flex-1">
                                <h3 className="text-md font-semibold">{item.roomTitle}</h3>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="flex-1">
                                <p>{item.type}</p>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="flex-1">
                                <p>{item.userid}</p>
                            </div>

                            <Separator orientation="vertical" />
                            <div className="flex-1">
                                <p> {item.roomId}</p>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="flex-1">
                                <p> {new Date(item._creationTime).toLocaleString()}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}
