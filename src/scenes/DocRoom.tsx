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
    return (
        <RoomProvider id={roomId} initialPresence={{
            cursor: null,
            status: 'online',
        }}>
            <ClientSideSuspense fallback={<Spinner />}>
                <CollabarativeEditor roomId={roomId} />
            </ClientSideSuspense>

        </RoomProvider>
    )
}

export default DocRoom
