import { RootState } from '@/store/store';
import React, { useRef, useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

function ShareModal() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [emailList, setEmailList] = useState<string[]>([]);
    const ref = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const roomDetails = useSelector((state: RootState) => state.liveblocksDetails.LiveBlocksRoomData);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-red-500 group"
                >
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
                    <div>
                        <Label>Enter the Email Address</Label>
                        <Input
                            type="email"
                            ref={ref}
                            className="mb-2"
                            required
                            pattern={emailRegex.source}
                            placeholder="Enter email address"
                        />
                        <Button
                            onClick={() => {
                                const email = ref.current?.value;
                                if (email && emailRegex.test(email)) {
                                    setEmailList(prevState => [...prevState, email]);
                                    ref.current.value = '';
                                } else {
                                    toast.toast({
                                        title: "Enter a valid Email Address",
                                    });
                                }
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    {/* Optional footer content */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ShareModal;
