'use client';

import { useState } from 'react';
import { GridIcon, ListIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UserRecordsGrid } from './drive-item-grid';
import { UserRecordsList } from './drive-item-list';
import { MoveFileModal } from '../MoveFileModal';
import { ContentType, folderContents } from '@/types/types';
import { MoveFileContents, MoveFolderContents } from '@/utils/RoomUtils';
type FolderExplorer = {
  data: folderContents;
};
export function UserRecordsExplorer({ data }: FolderExplorer) {
  const [isGridView, setIsGridView] = useState(true);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ContentType | null>(
    null
  );
  const handleMove = (record: ContentType) => {
    setSelectedRecord(record);
    setMoveModalOpen(true);
  };

  const handleMoveConfirm = (parenturl: string) => {
    try {
      if (selectedRecord === null) setMoveModalOpen(false);
      if (selectedRecord?.type === 'folder') {
        MoveFolderContents({
          id: selectedRecord._id!,
          parenturl,
          oldfileurl: selectedRecord?.parent + '/' + selectedRecord.roomTitle,
          newfileurl: parenturl + '/' + selectedRecord.roomTitle,
        });
      } else {
        MoveFileContents({
          id: selectedRecord?._id!,
          parenturl,
        });
      }
      setMoveModalOpen(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-end w-3/4 mb-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="view-toggle" className="sr-only">
            Toggle view
          </Label>
          <ListIcon
            className={`w-5 h-5 ${!isGridView ? 'text-primary' : 'text-muted-foreground'}`}
          />
          <Switch
            id="view-toggle"
            checked={isGridView}
            onCheckedChange={setIsGridView}
          />
          <GridIcon
            className={`w-5 h-5 ${isGridView ? 'text-primary' : 'text-muted-foreground'}`}
          />
        </div>
      </div>
      {isGridView ? (
        <UserRecordsGrid data={data.data} onMove={handleMove} />
      ) : (
        <UserRecordsList data={data.data} onMove={handleMove} />
      )}
      <MoveFileModal
        isOpen={moveModalOpen}
        onClose={() => setMoveModalOpen(false)}
        onConfirm={handleMoveConfirm}
        records={data.data}
        currentRecord={selectedRecord}
      />
    </div>
  );
}
