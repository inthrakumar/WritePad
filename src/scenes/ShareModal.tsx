import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateUserAccess } from '@/utils/RoomUtils';
import * as z from 'zod';
import { ShareModalProps } from '@/types/types';
import { RoomData } from '@liveblocks/node';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
const ShareModal = ({ isOpen, roomData }: ShareModalProps) => {
    console.log(isOpen, roomData);
    return roomData == null ? (
        <Dialog open={isOpen}>
            <DialogContent aria-describedby="modal">
                <DialogTitle>Loading .....</DialogTitle>
            </DialogContent>
        </Dialog>
    ) : (
        <RoomShareModal roomData={roomData!} isOpen={isOpen} />
    );
};
function RoomShareModal({
    isOpen,
    roomData,
}: {
    isOpen: boolean;
    roomData: RoomData;
}) {
    const [emailList, setEmailList] = useState<string[]>([]);
    const [editemailList, setEditemailList] = useState<string[]>([]);
    const [editaccessType, seteditAccessType] = useState<'write' | 'read'>(
        'read'
    );
    const emailSchema = z.string().email();
    const [accessType, setAccessType] = useState<'write' | 'read' | null>(null);
    const ref = useRef<HTMLInputElement>(null);
    const toast = useToast();
    const users = roomData?.usersAccesses
        ? Object.keys(roomData.usersAccesses)
        : [];

    const addEmailToList = () => {
        const email = ref.current?.value;
        if (email && emailSchema.safeParse(email).success) {
            setEmailList((prevState) => [...prevState, email]);
            ref.current.value = '';
        } else {
            toast.toast({
                title: 'Enter a valid Email Address',
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
        console.log("started")
        if (!accessType || emailList.length === 0 || !roomData) {
            toast.toast({
                title: 'Please select access type and add at least one email.',
            });
            return;
        }

        try {
            await updateUserAccess({
                emailList,
                roomId: roomData.id!,
                accessType,
            });

            setEmailList([]);
            setEditemailList([]);
            toast.toast({
                title: 'User Access Updated Successfully',
            });
        } catch (error) {
            console.log(error);
            toast.toast({
                title: 'Error updating user access.',
                description: (error as Error).message,
            });
        }
    }
    async function editUserAccess(): Promise<void> {
        if (!editaccessType || editemailList.length === 0 || !roomData) {
            toast.toast({
                title: 'Please select access type and add at least one email.',
            });
            return;
        }

        try {
            if (emailList.length > 3) {
                toast.toast({
                    title: 'At a time only 3 emails can be updated',
                });
                return;
            }
            await updateUserAccess({
                emailList: editemailList,
                roomId: roomData.id!,
                accessType: editaccessType,
            });

            setEmailList([]);
            setEditemailList([]);
            toast.toast({
                title: 'User Access Updated Successfully',
            });
        } catch (error) {
            toast.toast({
                title: 'Error updating user access.',
                description: (error as Error).message,
            });
        }
    }
    return (
        <Dialog open={isOpen}>
            <DialogContent
                aria-describedby="main-modal"
                className="sm:max-w-[425px] z-[1900000]"
            >
                <DialogHeader>
                    <DialogTitle>Add Users</DialogTitle>
                    <DialogDescription>
                        Share this room with your team members to allow them to collaborate
                        and view the document.
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
                                    onClick={() =>
                                        setEmailList((prevState) =>
                                            prevState.filter((e) => e !== email)
                                        )
                                    }
                                    className="cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <Input
                            type="email"
                            ref={ref}
                            className="mb-2"
                            required
                            placeholder="Enter email address"
                        />
                        <div className="flex gap-3 items-center justify-center">
                            <RadioGroup
                                defaultValue="read"
                                onValueChange={(value) =>
                                    setAccessType(value as 'write' | 'read')
                                }
                                className="flex gap-4"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="write" id="write" />
                                    <Label htmlFor="write">Can edit</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="read" id="read" />
                                    <Label htmlFor="read">Can view</Label>
                                </div>
                            </RadioGroup>

                            <Button onClick={handleUserAccess}>Add Access</Button>
                        </div>
                        ;{' '}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShareModal;
