'use client'
import React from 'react'
import DocRoom from '@/scenes/DocRoom'
import { useParams } from 'next/navigation'
function Document() {
    const params = useParams();
    const roomId = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;

    return (
        <DocRoom roomId={roomId as string}>
            <div></div>
        </DocRoom>
    );
}

export default Document;

