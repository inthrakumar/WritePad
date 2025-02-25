'use client';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, File, Folder } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger,DialogTitle } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '@clerk/clerk-react';
import { CreateRoom } from '@/utils/RoomUtils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const createFileSchema = z.object({
    name: z.string().min(2, {
        message: 'Filename must be at least 2 characters.',
    }),
});

const createFolderSchema = z.object({
    name: z.string().min(2, {
        message: 'Folder name must be at least 2 characters.',
    }),
});

type CreateFileFormData = z.infer<typeof createFileSchema>;
type CreateFolderFormData = z.infer<typeof createFolderSchema>;

interface CreateFileFormProps {
    onClose: (path:string) => void;
}

interface CreateFolderFormProps {
    onClose: (path:string) => void;
}

const CreateFileForm: React.FC<CreateFileFormProps> = ({ onClose }) => {
    const form = useForm<CreateFileFormData>({
        resolver: zodResolver(createFileSchema),
        defaultValues: {
            name: 'Untitled',
        },
    });
    const userDetails = useUser();
    const pathname = usePathname();
    const [isLoading,setLoading] = useState(false);
    const onSubmit: SubmitHandler<CreateFileFormData> = async (values) => {
        try {
            setLoading(true);
            if (userDetails?.user) {
                const response = await CreateRoom({
                    userId: userDetails.user.id,
                    parent: pathname,
                    type: 'file',
                    email: userDetails.user.emailAddresses[0].emailAddress,
                    title: values.name,
                });
                
                if (response.status) {
                    onClose(response.path);
                }
            }
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
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
                <Button disabled={isLoading} type="submit">Create File</Button>
            </form>
        </Form>
    );
};

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({ onClose }) => {
    const form = useForm<CreateFolderFormData>({
        resolver: zodResolver(createFolderSchema),
        defaultValues: {
            name: 'New Folder',
        },
    });
    const userDetails = useUser();
    const pathname = usePathname();
    const [isLoading,setLoading] = useState<boolean>(false);
    const onSubmit: SubmitHandler<CreateFolderFormData> = async (values) => {
        try {
            setLoading(true);
            if (userDetails?.user) {
                const content = await CreateRoom({
                    userId: userDetails.user.id,
                    parent:pathname,
                    type: 'folder',
                    email: userDetails.user.emailAddresses[0].emailAddress,
                    title: values.name,
                });
                if (content.status) {
                    console.log(content.path);
                    onClose(content.path);
                }
            }
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Folder name</FormLabel>
                            <FormControl>
                                <Input placeholder="New Folder" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit">Create Folder</Button>
            </form>
        </Form>
    );
};

const NewCreation: React.FC = () => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [itemType, setItemType] = React.useState<'file' | 'folder'>('file');
    const router= useRouter();
    const handleNewItem = (type: 'file' | 'folder') => {
        setItemType(type);
        setDialogOpen(true);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex gap-1 text-sm">
                        New <Plus />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => handleNewItem('file')}>
                        <File className="mr-2 h-4 w-4" />
                        <span>New File</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNewItem('folder')}>
                        <Folder className="mr-2 h-4 w-4" />
                        <span>New Folder</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent aria-describedby="dialog-description">
                    <VisuallyHidden>
                        <DialogTitle>
                            Create {itemType === 'file' ? 'File' : 'Folder'}
                        </DialogTitle>
                    </VisuallyHidden>
                    {itemType === 'file' ? (
                        <CreateFileForm onClose={(path:string) =>{
                            setDialogOpen(false);
                            router.push(path);
                        }} />
                    ) : (
                        <CreateFolderForm  onClose={(path:string) =>{
                            setDialogOpen(false);
                            router.push(path);
                        }}/>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewCreation;
