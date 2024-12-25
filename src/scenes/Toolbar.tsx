import { Editor } from '@tiptap/react';
import styles from '../css/Toolbar.module.css';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Document from '@tiptap/extension-document';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { DivideIcon } from 'lucide-react';
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

const Redo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M15 4a1 1 0 0 1 1.7-.7l5 5a1 1 0 0 1 0 1.4l-5 5A1 1 0 0 1 15 14v-3h-4a4 4 0 1 0 0 8h2a1 1 0 1 1 0 2h-2a6 6 0 1 1 0-12h4V4z" />
  </svg>
);
function BoldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.25 25H9V7H17.5C18.5022 7.00006 19.4834 7.28695 20.3277 7.82679C21.172 8.36662 21.8442 9.13684 22.2649 10.0465C22.6855 10.9561 22.837 11.9671 22.7015 12.96C22.5659 13.953 22.149 14.8864 21.5 15.65C22.3477 16.328 22.9645 17.252 23.2653 18.295C23.5662 19.3379 23.5364 20.4485 23.18 21.4738C22.8236 22.4991 22.1581 23.3887 21.2753 24.0202C20.3924 24.6517 19.3355 24.994 18.25 25ZM12 22H18.23C18.5255 22 18.8181 21.9418 19.091 21.8287C19.364 21.7157 19.6121 21.5499 19.821 21.341C20.0299 21.1321 20.1957 20.884 20.3087 20.611C20.4218 20.3381 20.48 20.0455 20.48 19.75C20.48 19.4545 20.4218 19.1619 20.3087 18.889C20.1957 18.616 20.0299 18.3679 19.821 18.159C19.6121 17.9501 19.364 17.7843 19.091 17.6713C18.8181 17.5582 18.5255 17.5 18.23 17.5H12V22ZM12 14.5H17.5C17.7955 14.5 18.0881 14.4418 18.361 14.3287C18.634 14.2157 18.8821 14.0499 19.091 13.841C19.2999 13.6321 19.4657 13.384 19.5787 13.111C19.6918 12.8381 19.75 12.5455 19.75 12.25C19.75 11.9545 19.6918 11.6619 19.5787 11.389C19.4657 11.116 19.2999 10.8679 19.091 10.659C18.8821 10.4501 18.634 10.2843 18.361 10.1713C18.0881 10.0582 17.7955 10 17.5 10H12V14.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 9V7H12V9H17.14L12.77 23H7V25H20V23H14.86L19.23 9H25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StrikethroughIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11H13.076Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function Undo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path d="M9 4a1 1 0 0 0-1.7-.7L2.3 8.3a1 1 0 0 0 0 1.4l5 5A1 1 0 0 0 9 14V11h4a4 4 0 0 1 0 8h-2a1 1 0 1 0 0 2h2a6 6 0 0 0 0-12H9V4z" />
    </svg>
  );
}

const HighlightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M12 2a1 1 0 0 1 .9.56l1.36 2.72 3.01.44a1 1 0 0 1 .55 1.7l-2.18 2.13.51 2.97a1 1 0 0 1-1.45 1.05L12 12.9l-2.67 1.4a1 1 0 0 1-1.45-1.05l.51-2.97-2.18-2.13a1 1 0 0 1 .55-1.7l3.01-.44L11.1 2.56A1 1 0 0 1 12 2zm0 7.41L10.3 10.4l.37-2.13a1 1 0 0 1 .29-.56l1.46-1.43-2.13-.31a1 1 0 0 1-.56-.29L8.6 4.7l.31 2.13a1 1 0 0 1-.29.56L7.13 8.88l2.13.31a1 1 0 0 1 .56.29L12 10.59zM9 15h6v2H9v-2zm1 3h4v2h-4v-2z" />
  </svg>
);

const DividerLine = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="1"
        viewBox="0 0 100 1"
    >
        <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="1" />
    </svg>
);

const EnterDownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
    >
        <path d="M12 2a1 1 0 0 1 1 1v12.59l3.29-3.29a1 1 0 0 1 1.42 1.42l-5 5a1 1 0 0 1-1.42 0l-5-5a1 1 0 0 1 1.42-1.42L11 15.59V3a1 1 0 0 1 1-1z" />
    </svg>
);
