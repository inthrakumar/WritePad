import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { UpdateTitleFn } from '@/utils/RoomUtils';
import { setTitle as setTitleAction } from '@/store/slice/RoomSlice';
import { Pen, Check, Loader } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const RoomTitle = () => {
    const roomDetails = useSelector((state: RootState) => state.roomDetails);
    const [title, setTitleState] = useState(roomDetails.title || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const dispatch = useDispatch();
    const userRef = useRef<HTMLInputElement | null>(null);
    const user = useUser();
    const handleTitleChange = async () => {
        setIsLoading(true);
        try {
            if (userRef.current) {
                const updatedTitle = userRef.current.value;
                await UpdateTitleFn({
                    roomId: roomDetails.roomId as string,
                    title: updatedTitle,
                    id: roomDetails.roomConvexId!,
                });
                dispatch(setTitleAction(updatedTitle));
                setIsDisabled(true);
            }
        } catch (error) {
            console.error("Failed to update title:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='flex items-center justify-center gap-2'>
            <Input
                type="text"
                ref={userRef}
                value={title}
                onChange={(e) => {
                    setTitleState(e.target.value);
                }}
                disabled={isDisabled}
                className='w-[20vw] max-w-[20vw] rounded-lg'
            />

            {user.user && roomDetails.owner === user.user.id ?
                <span className='hover:cursor-pointer'>
                    {isDisabled ? (
                        <Pen
                            size={13}
                            className="text-gray-400"
                            onClick={() => setIsDisabled(false)}
                        />
                    ) : isLoading ? (
                        <Loader size={16} className="text-gray-400 animate-spin" />
                    ) : (
                        <Check
                            size={13}
                            className="text-gray-400"
                            onClick={handleTitleChange}
                        />
                    )}
                </span> : null}
        </div>
    );
};

export default RoomTitle;
