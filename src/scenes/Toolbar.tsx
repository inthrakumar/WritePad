import { Editor } from '@tiptap/react';
import styles from '../css/Toolbar.module.css';
import { Redo,Undo,HighlightIcon,StrikethroughIcon ,DividerLine,EnterDownIcon,ItalicIcon,BoldIcon} from './ToolBarComponents';
type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.toolbar}>
      <button
        aria-label="undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`${editor.isActive('bold') ? 'is-active' : ''} ${styles.button}`}
      >
        <Undo />
      </button>
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-active={editor.isActive('bold') ? 'is-active' : undefined}
        aria-label="bold"
      >
        <BoldIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        disabled={!editor.can().chain().focus().setHorizontalRule().run()}
        data-active={editor.isActive('highlight') ? 'is-active' : undefined}
        aria-label="highlight"
      >
        <DividerLine />
      </button>
            
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().setHardBreak().run()}
        disabled={!editor.can().chain().focus().setHardBreak().run()}
        data-active={editor.isActive('highlight') ? 'is-active' : undefined}
        aria-label="highlight"
      >
        <EnterDownIcon />
      </button>
      <button
        aria-label="redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`${editor.isActive('bold') ? 'is-active' : ''} ${styles.button}`}
      >
        <Redo />
      </button>
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-active={editor.isActive('italic') ? 'is-active' : undefined}
        aria-label="italic"
      >
        <ItalicIcon />
      </button>
      
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        data-active={editor.isActive('italic') ? 'is-active' : undefined}
        aria-label="italic"
      >
        <HighlightIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        data-active={editor.isActive('strike') ? 'is-active' : undefined}
        aria-label="strikethrough"
      >
        <StrikethroughIcon />
      </button>
    </div>
  );
}


