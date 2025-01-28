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
export type {DeleteFolder, MoveFile,MoveFolder, ColorProps,EditorProps, UpdateTitle, folderContents, DeleteFile };
        
