import React from 'react'
import { useOthers } from '@liveblocks/react/suspense'
import { Avatar, AvatarImage } from "@/components/ui/avatar"

function CollabaratorStack() {

    const otherUsers = useOthers();
    const collabarators = otherUsers.map((user) => user.info);
    const maxVisibleCollaborators = 3;

    return (
        <div className='flex items-center justify-center gap-1'>
            {
                collabarators.slice(0, maxVisibleCollaborators).map((collaborator, index) => (
                    <Avatar key={index}>
                        {
                            collaborator.avatarUrl ? (
                                <AvatarImage src={collaborator.avatarUrl} />
                            ) : (
                                <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${collaborator.username}`} />
                            )
                        }
                    </Avatar>
                ))
            }

            {
                collabarators.length > maxVisibleCollaborators && (
                    <span className='text-sm text-gray-500'>+{collabarators.length - maxVisibleCollaborators}</span>
                )
            }

        </div>
    )
}
export default CollabaratorStack;
