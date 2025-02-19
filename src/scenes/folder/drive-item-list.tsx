import { FolderIcon, FileIcon, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Contents } from '@/types/types';

export function UserRecordsList({
    isShared,
    data,
    onShare,
    onMove,
    onDelete,
}: Contents) {
    const pathname = usePathname();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Room ID</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((record) => (
                    <TableRow key={record._id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                                {record.type === 'folder' ? (
                                    <FolderIcon className="w-5 h-5 text-blue-500" />
                                ) : (
                                    <FileIcon className="w-5 h-5 text-gray-500" />
                                )}
                                <Link
                                    key={record._id}
                                    href={
                                        record.type === 'folder'
                                            ? `${pathname}/${encodeURIComponent(record.roomTitle)}`
                                            : `/document/${record.roomId}`
                                    }
                                >
                                    <span className="cursor-pointer">{record.roomTitle}</span>
                                </Link>
                            </div>
                        </TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.roomId}</TableCell>
                        <TableCell>
                            {new Date(record._creationTime).toLocaleString()}
                        </TableCell>
                        {!isShared && (
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onMove(record)}>
                                            Move
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(record)}>
                                            Delete
                                        </DropdownMenuItem>{' '}
                                        {record.type == 'file' && (
                                            <DropdownMenuItem onClick={() => onShare(record.roomId)}>
                                                Share
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
