import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import * as Y from 'yjs';
import { UpdateTitle } from '../../convex/rooms';
import { Id } from '../../convex/_generated/dataModel';
import { RoomData } from '@liveblocks/node';
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
  name: string;
};
type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
  data: Record<string, any>;
  object: 'event';
  type: EventType;
};
type DeleteFile = {
  roomId: string;
  id: Id<'userRecords'>;
};

type DeleteFolder = {
  url: string;
  id: Id<'userRecords'>;
};
type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalpages: number;
};
type FolderExplorer = {
  page: number;
  totalpages: number;
  setPage: (page: number) => void;
  isShared: boolean;
  data: folderContents;
};

type Contents = {
  isShared: boolean;
  data: ContentType[];
  onMove: (record: ContentType) => void;
  onDelete: (record: ContentType) => void;
  onShare: (roomId: string) => void;
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
type MoveFile = {
  parenturl: string;
  id: Id<'userRecords'>;
};
type MoveFolder = {
  parenturl: string;
  id: Id<'userRecords'>;
  newfileurl: string;
  oldfileurl: string;
};
type ContentType = {
  _id: Id<'userRecords'>;
  _creationTime: number;
  userid: string;
  type: string;
  parent: string;
  roomId: string;
  roomTitle: string;
  lastEdited: string;
};
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
type ShareModalProps = {
  isOpen: boolean;
  roomData: RoomData | null;
};
export type {
  Event,
  EventType,
  MoveModalProps,
  ShareModalProps,
  DeleteModalProps,
  FolderExplorer,
  Contents,
  ContentType,
  DeleteFolder,
  MoveFile,
  MoveFolder,
  ColorProps,
  EditorProps,
  UpdateTitle,
  folderContents,
  DeleteFile,
  PaginationProps,
};
