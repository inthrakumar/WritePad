'use client'
import Spinner from './Spinner'
import React from 'react'
import CollabarativeEditor from './CollabarativeEditor'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
type Proptypes = {
    roomId: string,
    children: React.ReactNode,
}
const DocRoom = ({ roomId }: Proptypes

) => {
    console.log(roomId);
    return (
        <RoomProvider id={roomId} initialPresence={{
            cursor: {
                x: 0,
                y: 0,
            },
            status: 'online',
        }}>
            <ClientSideSuspense fallback={<Spinner />}>
                <CollabarativeEditor />
            </ClientSideSuspense>

        </RoomProvider>
    )
}

export default DocRoom
