"use client";


import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import RoomTitle from "./RoomTitle";
import { TiptapEditor } from "./TextEditor";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<any>();

    // Set up Liveblocks Yjs provider
    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);
        setDoc(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        };
    }, [room]);

    if (!doc || !provider) {
        return null;
    }

    return <div className="flex flex-col items-center justify-center gap-3">
        <RoomTitle />
        <TiptapEditor doc={doc} provider={provider} />
    </div>;
}

type EditorProps = {
    doc: Y.Doc;
    provider: any;
};


