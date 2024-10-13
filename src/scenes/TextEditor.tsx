import React from 'react'
import type { EditorProps } from '../types/types'
import { BlockNoteView } from '@blocknote/shadcn';
import { BlockNoteEditor } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useSelf } from '@liveblocks/react/suspense';
import "@blocknote/shadcn/fonts/inter.css"
import "@blocknote/shadcn/style.css"
function TextEditor({ doc, provider }: EditorProps) {
    const currentUser = useSelf((self) => self.info);
    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlElement('document-store'),
            user: {

                name: currentUser?.username,
                color: currentUser?.colors
            }
        }
    })
    return (
        <div className='relative max-w-6xl'>
            <BlockNoteView editor={editor} className='min-h-screen' />

        </div>
    )
}

export default TextEditor
