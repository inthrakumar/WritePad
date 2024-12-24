"use client";


import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import RoomTitle from "./RoomTitle";
import { TiptapEditor } from "./TextEditor";
import ShareModal from "./ShareModal";

export function CollaborativeEditor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<any>();

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

    return <div className="flex p-6 flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-around w-[70vw]">
            <RoomTitle />
            <ShareModal />
        </div>
        <TiptapEditor doc={doc} provider={provider} />
    </div>;
}

type EditorProps = {
    doc: Y.Doc;
    provider: any;
};


