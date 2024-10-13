
import { useEffect } from 'react';
import { useRoom } from '@liveblocks/react/suspense';
import *  as Y from 'yjs';
export default function DocLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>{children}</div>
    );
}
