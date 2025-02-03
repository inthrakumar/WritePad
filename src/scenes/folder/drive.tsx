'use client';

import { useState } from 'react';
import { GridIcon, ListIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UserRecordsGrid } from './drive-item-grid';
import { UserRecordsList } from './drive-item-list';
import { MoveFileModal } from '../MoveFileModal';
import { ContentType, FolderExplorer } from '@/types/types';
import { SearchBar } from '../SearchBar';
import { useRouter } from 'next/navigation';
import {
    MoveFileContents,
    MoveFolderContents,
    DeleteRoom,
    DeleteFolderContents,
} from '@/utils/RoomUtils';
import { DeleteModal } from '../DeleteModal';
export function UserRecordsExplorer({ data }: FolderExplorer) {
    const [isGridView, setIsGridView] = useState(true);
    const [moveModalOpen, setMoveModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<ContentType | null>(
        null
    );
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleMove = (record: ContentType) => {
        setSelectedRecord(record);
        setMoveModalOpen(true);
    };
    const router = useRouter();
    const handleDelete = (record: ContentType) => {
        setSelectedRecord(record);
        setDeleteModalOpen(true);
    };
    const handleDeleteConfirm = async () => {
        try {
            if (!selectedRecord) setDeleteModalOpen(false);
            if (selectedRecord?.type === 'folder') {
                DeleteFolderContents({
                    id: selectedRecord._id!,
                    url: selectedRecord.parent + '/' + selectedRecord.roomTitle,
                });
            } else {
                DeleteRoom({
                    id: selectedRecord?._id!,
                    roomId: selectedRecord?.roomId!,
                });
            }
        } catch (error) {
            console.error(error);
        }
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
    const onNavigate = (record: ContentType) => {
        try {

            if (!record) return null;
            if (record.type === 'file') {
                router.push(`/document/${record.roomId}`);
            }
            if (record.type === 'folder') {
                router.push(`${record.parent}` + '/' + `${record.roomTitle}`);
            }
        } catch {
            return null;
        }
    };
    return (
        <div className="p-4">
            <div className="flex justify-between items-center w-[90vw] mb-4">
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
                <SearchBar data={data.data} onNavigate={onNavigate} />
            </div>
            {isGridView ? (
                <UserRecordsGrid
                    data={data?.data}
                    onMove={handleMove}
                    onDelete={handleDelete}
                />
            ) : (
                <UserRecordsList
                    data={data?.data}
                    onMove={handleMove}
                    onDelete={handleDelete}
                />
            )}
            <MoveFileModal
                isOpen={moveModalOpen}
                onClose={() => setMoveModalOpen(false)}
                onConfirm={handleMoveConfirm}
                records={data.data}
                currentRecord={selectedRecord}
            />
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                content={selectedRecord}
            />
        </div>
    );
}
