'use client'

import React from 'react'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
type Proptypes = {
    roomId: string,
    children: React.ReactNode,
}
const DocRoom = ({ children, roomId }: Proptypes

) => {
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                {children}
            </ClientSideSuspense>

        </RoomProvider>
    )
}

export default DocRoom
