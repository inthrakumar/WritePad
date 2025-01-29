import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FolderIcon } from 'lucide-react';
import { MoveModalProps } from '@/types/types';

export function MoveFileModal({
    isOpen,
    onClose,
    onConfirm,
    records,
    currentRecord,
}: MoveModalProps) {
    if(!records || !currentRecord) return null;
    const pathname = usePathname();
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    const [isWarn, setWarn] = useState<boolean>(false);
    const folders = records.filter(
        (record) => record.type === 'folder' && record._id !== currentRecord?._id
    );

    const handleConfirm = () => {
        setWarn(false);
        if (selectedFolder!='') {
        onConfirm(pathname + '/' + encodeURIComponent(selectedFolder));
        } else {
            setWarn(true);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Move {currentRecord?.roomTitle}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[300px] w-full pr-4 max-h-[300px]">
                    {folders.map((folder) => (
                        <Button
                            key={folder._id}
                            variant="ghost"
                            className={`w-full justify-start mb-1 ${selectedFolder === folder._id ? 'bg-secondary' : ''}`}
                            onClick={() => setSelectedFolder(folder.roomTitle)}
                        >
                            <FolderIcon className="mr-2 h-4 w-4" />
                            {folder.roomTitle}
                        </Button>
                    ))}
                </ScrollArea>
                {isWarn && (
                    <div className="text-red-500 text-sm">Please select a folder</div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={!selectedFolder}>
                        Move
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
