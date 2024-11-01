import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { UpdateTitleFn } from '@/utils/RoomUtils';
import { setTitle } from '@/store/slice/RoomSlice';

const RoomTitle = () => {
    const roomDetails = useSelector((state: RootState) => state.roomDetails);
    const [title, setTitleState] = useState(roomDetails.title || '');
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleState(event.target.value);
    };

    useEffect(() => {
        dispatch(setTitle(title));
    }, [title, dispatch]);

    useEffect(() => {
        return () => {
            UpdateTitleFn({
                roomId: roomDetails.roomId!,
                title: title,
                id: roomDetails.roomConvexId!
            });
        };
    }, [roomDetails.roomId, roomDetails.roomConvexId, title]);

    return (
        <div>
            <Input
                type="text"
                value={title}
                onChange={handleChange}
                disabled={false}
                className='w-[30vw] max-w-[30vw]'
            />
        </div>
    );
};

export default RoomTitle;
