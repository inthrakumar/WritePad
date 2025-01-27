import { Editor } from '@tiptap/react';
import styles from '../css/Toolbar.module.css';
import {
  FontFamilyDropdown,
  BulletList,
  Redo,
  Undo,
  HighlightIcon,
  TableDropdown,
  StrikethroughIcon,
  DividerLine,
  EnterDownIcon,
  ItalicIcon,
  BoldIcon,
  TextAlignMenu,
  HeadingDropdown,
} from './ToolBarComponents';
type Props = {
  editor: Editor | null;
};
import { useCallback, useRef } from 'react';
import { ImageIcon } from 'lucide-react';

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputFileRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const fileBlob = (data: File) => {
    const blob = new Blob([data], { type: data.type });
    return blob;
  };

  const addImage = useCallback(
    (data: FileList | null) => {
      if (data && data[0]) {
        const file = data[0];
        const url = fileBlob(file);
        const reader = new FileReader();
        reader.readAsDataURL(url);
        reader.onloadend = function render() {
          const base64data = reader.result;
          if (base64data) {
            editor.chain().focus().setImage({ src: base64data as string }).run();
          }
        };
      }
    },
    [editor]
  );

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
        aria-label="bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? 'is-active' : ''} ${styles.button}`}
      >
        <BulletList />
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
        aria-label="divider"
      >
        <DividerLine />
      </button>

      <FontFamilyDropdown editor={editor} />
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().setHardBreak().run()}
        disabled={!editor.can().chain().focus().setHardBreak().run()}
        aria-label="hard break"
      >
        <EnterDownIcon />
      </button>

      <HeadingDropdown editor={editor} />

      <button
        aria-label="redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`${editor.isActive('bold') ? 'is-active' : ''} ${styles.button}`}
      >
        <Redo />
      </button>

      <TextAlignMenu editor={editor} />
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-active={editor.isActive('italic') ? 'is-active' : undefined}
        aria-label="italic"
      >
        <ItalicIcon />
      </button>

      <TableDropdown editor={editor} />
      <button
        className={styles.button}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        aria-label="highlight"
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

      <button
        ref={inputFileRef}
        onClick={handleClick}
        className={styles.button}
        aria-label="insert image"
      >
        <ImageIcon />
      </button>
      <input
        type="file"
        onChange={(event) => addImage(event.target.files)}
        ref={inputRef}
        hidden
        accept="image/jpeg,image/gif,image/png,image/x-eps"
      />
    </div>
  );
}

