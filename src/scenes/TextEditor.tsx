import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Toolbar } from "./Toolbar";
import styles from "../css/Editor.module.css";
import { useSelf } from "@liveblocks/react/suspense";
import { EditorProps } from "@/types/types";

export function TiptapEditor({ doc, provider }: EditorProps) {
    // Get user info from Liveblocks authentication endpoint
    const userInfo = useSelf((me) => me.info);

    // Set up editor with plugins, and place user info into Yjs awareness and cursors
    const editor = useEditor({
        editorProps: {
            attributes: {
                // Add styles to editor element
                class: styles.editor,
            },
        },
        extensions: [
            StarterKit.configure({
                // The Collaboration extension comes with its own history handling
                history: false,
            }),
            // Register the document with Tiptap
            Collaboration.configure({
                document: doc,
            }),
            // Attach provider and user info
            CollaborationCursor.configure({
                provider: provider,
                user: userInfo,
            }),
        ],
        immediatelyRender: false
    });

    return (
        <div className={styles.container}>
            <div className={styles.editorHeader}>
                <Toolbar editor={editor} />
            </div>
            <EditorContent editor={editor} className={styles.editorContainer} />
        </div>
    );
}