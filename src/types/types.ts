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
export type { EditorProps, UpdateTitle, folderContents };
