import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useUser, useAuth } from '@clerk/clerk-react';
import { CreateRoom } from '@/utils/RoomUtils';
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

const CreateRoomForm = () => {
    const form = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            filename: "Untitled",
        },
    });
    const userDetails = useUser();

    const onSubmit: SubmitHandler<CreateRoomFormData> = async (values) => {
        let room = null;
        if (userDetails?.user) {
            room = await CreateRoom({
                userId: userDetails.user.id,
                email: userDetails.user.emailAddresses[0].emailAddress,
                title: values.filename,
            });
        }

    };

    return (
        <Dialog>
            <DialogTrigger className=''>
                <div className='w-full flex flex-row-reverse'>
                    <Button variant={'link'} className='shadow-sm bg-gray-100'><Plus size={15} color='#FF0000' /></Button>
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

export default CreateRoomForm;
