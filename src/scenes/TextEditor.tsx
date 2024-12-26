import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { Toolbar } from './Toolbar';
import styles from '../css/Editor.module.css';
import { useSelf } from '@liveblocks/react/suspense';
import { EditorProps } from '@/types/types';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Document from '@tiptap/extension-document';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family';
import LiveCursors from './cursor/LiveCursors';
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
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      FontFamily,
      TextStyle,
      Color,
      Document,
      Table.configure({
        resizable: false,
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
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
    immediatelyRender: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className={styles.editorContainer} />
      <LiveCursors />
    </div>
  );
}
