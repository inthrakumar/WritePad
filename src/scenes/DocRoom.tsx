'use client';

import Spinner from './Spinner';
import React, { useState, useEffect } from 'react';
import { CollaborativeEditor } from './CollabarativeEditor';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Proptypes = {
    roomId: string
    children: React.ReactNode;
};

const DocRoom = ({ roomId, children }: Proptypes) => {


    return (
        <RoomProvider
            id={roomId!}
            initialPresence={{
                cursor: {
                    x: 0,
                    y: 0,
                },
                status: 'online',
            }}
        >
            <ClientSideSuspense fallback={<Spinner />}>
                <CollaborativeEditor />
                {children}
            </ClientSideSuspense>
        </RoomProvider>
    );
};

export default DocRoom;
