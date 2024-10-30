"use client";

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getRoomDetails } from '../../../../utils/RoomUtils';
import { useDispatch } from 'react-redux';
import { setRoomDetails } from '../../../../store/slice/RoomSlice'
export default function DocLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useDispatch();
    const { uuid } = useParams();
    useEffect(() => {
        const roomId = uuid.toString();
        const FetchRoomDetails = async () => {
            const roomDetails = await getRoomDetails({ roomId });
            dispatch(setRoomDetails({
                roomId: roomDetails.data[0].roomId,
                roomConvexId: roomDetails.data[0]._id,
                title: roomDetails.data[0].roomTitle
            }));
        };
        FetchRoomDetails();
    }, [uuid]);

    return (
        <div>{children}</div>
    );
}
