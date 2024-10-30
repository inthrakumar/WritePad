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
export type { EditorProps, UpdateTitle };
