import { RootState } from '@/store/store';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { updateUserAccess } from '@/utils/RoomUtils';
import { setLiveBlocksRoomUserAccess } from '@/store/slice/LiveBlocksRoomSlice';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function ShareModal() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [emailList, setEmailList] = useState<string[]>([]);
    const [editemailList, setEditemailList] = useState<string[]>([]);
    const [editaccessType, seteditAccessType] = useState<'write' | 'read'>('read');

    const [accessType, setAccessType] = useState<'write' | 'read' | null>(null);
    const dispatch = useDispatch();
    const ref = useRef<HTMLInputElement>(null);
    const toast = useToast();
    const liveBlocksRoom = useSelector((state: RootState) => state.liveblocksDetails);
    const users = liveBlocksRoom.LiveBlocksRoomData?.usersAccesses
        ? Object.keys(liveBlocksRoom.LiveBlocksRoomData.usersAccesses)
        : [];

    const addEmailToList = () => {
        const email = ref.current?.value;
        if (email && emailRegex.test(email)) {
            setEmailList(prevState => [...prevState, email]);
            ref.current.value = '';
        } else {
            toast.toast({
                title: "Enter a valid Email Address",
            });
        }
    };

    useEffect(() => {
        const handleEnterKey = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                addEmailToList();
            }
        };

        document.addEventListener('keydown', handleEnterKey);
        return () => {
            document.removeEventListener('keydown', handleEnterKey);
        };
    }, []);

    async function handleUserAccess(): Promise<void> {
        if (!accessType || emailList.length === 0 || !liveBlocksRoom.LiveBlocksRoomData) {
            toast.toast({
                title: "Please select access type and add at least one email.",
            });
            return;
        }

        try {
            const userAccesses = await updateUserAccess({
                emailList,
                roomId: liveBlocksRoom.LiveBlocksRoomData.id!,
                accessType,
            });

            dispatch(setLiveBlocksRoomUserAccess(userAccesses));
            setEmailList([]);
            setEditemailList([]);
            toast.toast({
                title: "User Access Updated Successfully",
            });
        } catch (error) {
            toast.toast({
                title: "Error updating user access.",
                description: (error as Error).message,
            });
        }
    }
    async function editUserAccess(): Promise<void> {
        if (!editaccessType || editemailList.length === 0 || !liveBlocksRoom.LiveBlocksRoomData) {
            toast.toast({
                title: "Please select access type and add at least one email.",
            });
            return;
        }

        try {
            const userAccesses = await updateUserAccess({
                emailList: editemailList,
                roomId: liveBlocksRoom.LiveBlocksRoomData.id!,
                accessType: editaccessType,
            });

            dispatch(setLiveBlocksRoomUserAccess(userAccesses));
            setEmailList([]);
            setEditemailList([]);
            toast.toast({
                title: "User Access Updated Successfully",
            });
        } catch (error) {
            toast.toast({
                title: "Error updating user access.",
                description: (error as Error).message,
            });
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Users</DialogTitle>
                    <DialogDescription>
                        Share this room with your team members to allow them to collaborate and view the document.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 gap-2 h-[15vh] max-h-[15vh] p-2 overflow-y-auto shadow-md">
                        {emailList.map((email, index) => (
                            <div key={index} className="flex items-center gap-1 max-w-full">
                                <Button
                                    variant="link"
                                    className="truncate max-w-[10rem]"
                                    title={email}
                                >
                                    {email}
                                </Button>
                                <X
                                    size={10}
                                    onClick={() => setEmailList(prevState => prevState.filter((e) => e !== email))}
                                    className="cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>

                    <div className='grid grid-cols-1 gap-2'>
                        <Input
                            type="email"
                            ref={ref}
                            className="mb-2"
                            required
                            pattern={emailRegex.source}
                            placeholder="Enter email address"
                        />
                        <div className='flex gap-3 items-center justify-center'>
                            <Select onValueChange={(value) => {
                                setAccessType(value as 'write' | 'read');
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Access" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="write">can edit</SelectItem>
                                        <SelectItem value="read">can view</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Button onClick={handleUserAccess}>
                                Add Access
                            </Button>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-2'>
                        <DialogTitle>Edit User Access</DialogTitle>
                        <DialogDescription>
                            Edit the way in which current users can access the Document.
                        </DialogDescription>
                        <div className='w-full flex gap-2'>
                            <Select onValueChange={(value) => {
                                setEditemailList([value]);
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Users" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {users.map((ele, index) => (
                                            <SelectItem key={index} value={ele}>
                                                {ele}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value) => {
                                seteditAccessType(value as 'write' | 'read');
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Access" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="write">can edit</SelectItem>
                                        <SelectItem value="read">can view</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Button onClick={editUserAccess}>
                                Edit Access
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShareModal;
