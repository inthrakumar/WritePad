import React, { useState, useEffect } from 'react'
import { useRoom } from '@liveblocks/react/suspense';
import *  as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import TextEditor from './TextEditor';

const CollabarativeEditor = () => {
    console.log('room');
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [docProvider, setDocProvider] = useState<LiveblocksYjsProvider>();
    useEffect(() => {
        const YDoc = new Y.Doc();
        const docProvider = new LiveblocksYjsProvider(room, YDoc);
        setDocProvider(docProvider);
        setDoc(YDoc);
        return () => {
            docProvider?.destroy();
            YDoc?.destroy();
        }
    }, [room])


    if (!doc || !docProvider) {
        return null;
    }
    return (
        <div className='max-w-6xl mx-auto'>
            <TextEditor doc={doc} provider={docProvider} />
        </div>
    )
}

export default CollabarativeEditor
