import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, File, Folder } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useUser } from '@clerk/clerk-react';
import { CreateRoom } from '@/utils/RoomUtils';
import { usePathname } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const createRoomSchema = z.object({
    filename: z.string().min(2, {
        message: "Filename must be at least 2 characters.",

    }),

});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;


const createFolderSchema = z.object({
    foldername: z.string().min(2, {
        message: "Filename must be at least 2 characters.",

    }),

});

type CreateFolderData = z.infer<typeof createFolderSchema>;

const CreateRoomForm = () => {
    const form = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            filename: "Untitled",
        },
    });
    const userDetails = useUser();
    const pathname = usePathname();
    const onSubmit: SubmitHandler<CreateRoomFormData> = async (values) => {
        let room = null;
        console.log(pathname);
        if (userDetails?.user) {
            room = await CreateRoom({
                userId: userDetails.user.id,
                parent: pathname,
                type: 'file',
                email: userDetails.user.emailAddresses[0].emailAddress,
                title: values.filename,
            });
        }

    };

    return (
        <Dialog>
            <DialogTrigger className=''>
                <div className='w-full flex flex-row-reverse'>
                    <Button variant={'link'} className='flex gap-1'><File size={15} /> New File</Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="filename"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Filename</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Untitled" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
const CreateFolderForm = () => {
    const form = useForm<CreateFolderData>({
        resolver: zodResolver(createFolderSchema),
        defaultValues: {
            foldername: "Untitled",
        },
    });
    const userDetails = useUser();
    const pathname = usePathname();
    const onSubmit: SubmitHandler<CreateFolderData> = async (values) => {
        console.log("hit");
        try {
            let room = null;
            if (userDetails?.user) {
                room = await CreateRoom({
                    userId: userDetails.user.id,
                    parent: pathname,
                    type: 'folder',
                    email: userDetails.user.emailAddresses[0].emailAddress,
                    title: values.foldername,
                });
            }
        } catch (error) {
            console.error(error);

        }

    };

    return (
        <Dialog>
            <DialogTrigger className=''>
                <div className='w-full flex flex-row-reverse'>
                    <Button variant={'link'} className='flex gap-1'><Folder size={15} /> New Folder</Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="foldername"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Foldername</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Untitled" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

const NewCreation = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Button className='flex gap-1 text-sm '>New <Plus/></Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel><CreateRoomForm /></DropdownMenuLabel>
                <DropdownMenuLabel><CreateFolderForm /></DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}
export default NewCreation;
