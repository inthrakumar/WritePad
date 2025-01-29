import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import * as Y from 'yjs';
import { UpdateTitle } from '../../convex/rooms';
import { Id } from '../../convex/_generated/dataModel';
type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
};
type UpdateTitle = {
  roomId: string;
  id: Id<'userRecords'>;
  title: string;
};
type ColorProps = {
  color: string;
  x: number;
  y: number;
    name:string
};

type DeleteFile ={
    roomId:string,
    id:Id<'userRecords'>
}

type DeleteFolder ={
    url:string,
    id:Id<'userRecords'>
}

type FolderExplorer = {
  data: folderContents;
};

type Contents = {
  data: ContentType[];
  onMove: (record: ContentType) => void;
  onDelete: (record: ContentType) => void;
};
type folderContents = {
  success: boolean;
  data: {
    _id: Id<'userRecords'>;
    _creationTime: number;
    userid: string;
    type: string;
    parent: string;
    roomId: string;
    roomTitle: string;
    lastEdited: string;
  }[];
};
type MoveFile={
    parenturl:string,
    id:Id<'userRecords'>
}
type MoveFolder={
    parenturl:string,
    id:Id<'userRecords'>
    newfileurl :string,
    oldfileurl:string
}
type ContentType ={
    _id: Id<'userRecords'>;
    _creationTime: number;
    userid: string;
    type: string;
    parent: string;
    roomId: string;
    roomTitle: string;
    lastEdited: string;
  }
type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  content: ContentType | null;
};
type MoveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (destinationId: string) => void;
  records: ContentType[];
  currentRecord: ContentType | null;
};
export type {MoveModalProps, DeleteModalProps, FolderExplorer , Contents ,ContentType ,DeleteFolder, MoveFile,MoveFolder, ColorProps,EditorProps, UpdateTitle, folderContents, DeleteFile };
        
