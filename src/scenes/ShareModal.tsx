import { RootState } from '@/store/store';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
function ShareModal() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [emailList, setEmailList] = useState<string[]>([]);
    const [accessType, setaccessType] = useState<string | null>(null);
    const ref = useRef<HTMLInputElement>(null);
    const toast = useToast();
    const roomDetails = useSelector((state: RootState) => state.liveblocksDetails.LiveBlocksRoomData);

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

    function handleUserAccess(): void {
        try {

        } catch (error) {
            throw new Error('Function not implemented.');

        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-red-500 group">
                    Share
                    <ArrowRight size={20} className="hidden group-hover:inline" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User Access</DialogTitle>
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
                        <div className='flex gap-3'>
                            <Select onValueChange={(value) => {
                                setaccessType(value);
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Access" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="edit">can edit</SelectItem>
                                        <SelectItem value="view">can view</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Button onClick={() => {
                                handleUserAccess()
                            }}>
                                Add Access
                            </Button></div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShareModal;
