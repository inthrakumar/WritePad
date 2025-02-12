'use server';

import { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import {
    liveblocks_connection,
    convex_connection,
} from '@/config/serverconfig';
import { api } from '../../convex/_generated/api';
import {
    MoveFile,
    DeleteFile,
    DeleteFolder,
    UpdateTitle,
    MoveFolder,
} from '../types/types';
import { Id } from '../../convex/_generated/dataModel';
import { isDeleted } from 'yjs';
import { Trykker } from 'next/font/google';
const CreateRoom = async ({
    userId,
    email,
    title,
    type,
    parent,
}: {
    userId: string;
    email: string;
    title: string;
    type: string;
    parent: string;
}) => {
    auth().protect();
    const roomId = nanoid();
    try {
        const data = {
            owner: userId,
            email: email,
            title: title,
            isAlive: 'true',
        };
        let roomDetails;
        if (type !== 'folder') {
            const usersAccesses: RoomAccesses = {
                [email]: ['room:write'],
            };
            roomDetails = await liveblocks_connection.createRoom(roomId, {
                usersAccesses,
                defaultAccesses: [],
                metadata: data,
            });
        }

        const convexRoom = await convex_connection.mutation(api.rooms.createRoom, {
            parent: parent,
            roomTitle: title,
            roomId,
            userid: userId,
            type: type,
        });
        revalidatePath(`/`);
        return JSON.parse(JSON.stringify(convexRoom));
    } catch (error) {
        return null;
    }
};

const UpdateTitleFn = async ({ roomId, id, title }: UpdateTitle) => {
    auth().protect();
    try {
        await liveblocks_connection.updateRoom(roomId, {
            metadata: {
                title,
            },
        });
        const updatedRoom = await convex_connection.mutation(
            api.rooms.UpdateTitle,
            {
                id: id,
                title: title,
            }
        );
        console.log(updatedRoom);
        revalidatePath(`/`);
        return JSON.parse(JSON.stringify(updatedRoom));
    } catch (error) {
        return null;
    }
};

const getOwnerRooms = async ({ roomId }: { roomId: string }) => {
    auth().protect();
    try {
        const roomDetails = await convex_connection.query(api.rooms.getUserRooms, {
            roomId: roomId,
        });
        return JSON.parse(JSON.stringify(roomDetails));
    } catch (error) {
        console.error(error);
    }
};

const getRoom = async ({ roomId }: { roomId: string }) => {
    auth().protect();
    try {
        const roomDetails = await liveblocks_connection.getRoom(roomId);
        revalidatePath(`/`);
        return JSON.parse(JSON.stringify(roomDetails));
    } catch (error) {
        console.error(error);
    }
};

const updateUserAccess = async ({
    emailList,
    roomId,
    accessType,
}: {
    emailList: string[];
    roomId: string;
    accessType: 'write' | 'read';
}) => {
    auth().protect();

    try {
        const roomDetails = await liveblocks_connection.getRoom(roomId);
        const usersAccesses = roomDetails.usersAccesses;

        emailList.forEach((email) => {
            usersAccesses[email] =
                accessType === 'write'
                    ? ['room:write']
                    : ['room:read', 'room:presence:write'];
        });
        await liveblocks_connection.updateRoom(roomId, { usersAccesses });
        const response = await convex_connection.mutation(
            api.rooms.AddSharedRooms,
            {
                userIds: emailList,
                roomId,
            }
        );
        if (!response.status)
            return JSON.parse(
                JSON.stringify({
                    message: 'Error in updating the user accesses',
                })
            );
        revalidatePath(`/`);

        await triggerNotifications(emailList, roomId, accessType);

        return usersAccesses;
    } catch (error) {
        console.error('Failed to update user access:', error);
        throw new Error('Error updating user access');
    }
};

const triggerNotifications = async (
    emailList: string[],
    roomId: string,
    accessType: 'write' | 'read'
) => {
    const notificationPromises = emailList.map((email) =>
        liveblocks_connection.triggerInboxNotification({
            userId: email,
            kind:
                accessType === 'write' ? '$writeAccessGranted' : '$readAccessGranted',
            subjectId: roomId,
            activityData: {
                accessType,
                timestamp: Date.now(),
            },
            roomId,
        })
    );

    await Promise.all(notificationPromises);
};
const getSharedRooms = async (userId: string, page: number) => {
    auth().protect();
    try {
        const response = await convex_connection.query(api.rooms.GetSharedRooms, {
            userId,
            page,
        });
        if (response.message) {
            return JSON.parse(
                JSON.stringify({
                    status: false,
                    message: 'There is no shared rooms for the user',
                })
            );
        }
        const sharedRooms = response.rooms;
        const totalpages = response.totalPages
        return JSON.parse(
            JSON.stringify({
                status: true,
                sharedRooms,
                totalpages
            })
        );
    } catch (error) {
        console.error('Error fetching shared rooms:', error);
        throw new Error('Failed to fetch shared rooms');
    }
};

const DeleteRoom = async ({ roomId, id }: DeleteFile) => {
    auth().protect();
    try {
        const room = await liveblocks_connection.updateRoom(roomId, {
            metadata: {
                isAlive: 'false',
            },
        });
        const deletedRoom = await convex_connection.mutation(api.rooms.DeleteFile, {
            id,
        });
        if (deletedRoom.success) {
            return JSON.parse(
                JSON.stringify({
                    success: true,
                })
            );
        }
    } catch (error) {
        console.error('Error in deleting the room:', error);
        throw new Error('Error in deleting a file');
    }
};
const DeleteFolderContents = async ({ id, url }: DeleteFolder) => {
    auth().protect();
    try {
        const deletedRooms = await convex_connection.mutation(
            api.rooms.DeleteFolder,
            { id, url }
        );
        if (Array.isArray(deletedRooms.childIds)) {
            await Promise.all(
                deletedRooms.childIds.map((childId) =>
                    liveblocks_connection.updateRoom(childId, {
                        metadata: {
                            isAlive: 'false',
                        },
                    })
                )
            );
        }
        return JSON.parse(
            JSON.stringify({
                sucess: true,
            })
        );
    } catch (error) {
        console.error('Error in deleting the folder:', error);
        throw new Error('Error in deleting the folder');
    }
};

const MoveFileContents = async ({ id, parenturl }: MoveFile) => {
    auth().protect();
    try {
        const movedRoom = await convex_connection.mutation(api.rooms.MoveFile, {
            id,
            parenturl,
        });
        revalidatePath('/');
        return JSON.parse(JSON.stringify(movedRoom));
    } catch (error) {
        throw new Error('Error in moving the file');
    }
};
const MoveFolderContents = async ({
    id,
    parenturl,
    oldfileurl,
    newfileurl,
}: MoveFolder) => {
    auth().protect();
    try {
        const movedFolder = await convex_connection.mutation(api.rooms.MoveFolder, {
            id,
            parenturl,
            oldfileurl,
            newfileurl,
        });
        revalidatePath('/');
        return JSON.parse(JSON.stringify(movedFolder));
    } catch (error) {
        throw new Error('Error in moving the file');
    }
};
export {
    MoveFolderContents,
    DeleteFolderContents,
    DeleteRoom,
    CreateRoom,
    UpdateTitleFn,
    getOwnerRooms,
    getRoom,
    updateUserAccess,
    getSharedRooms,
    MoveFileContents,
};
