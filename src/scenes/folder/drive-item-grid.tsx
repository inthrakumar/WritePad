import { FolderIcon, FileIcon, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { folderContents } from '@/types/types'

export function UserRecordsGrid({ data }: folderContents) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data.map((record) => (
        <div
          key={record._id}
          className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex flex-col items-center"
        >
          {record.type === 'folder' ? (
            <FolderIcon className="w-16 h-16 text-blue-500 mb-2" />
          ) : (
            <FileIcon className="w-16 h-16 text-gray-500 mb-2" />
          )}
          <span className="text-sm text-center truncate w-full">{record.roomTitle}</span>
          <span className="text-xs text-muted-foreground truncate w-full">
            {new Date(record.lastEdited).toLocaleDateString()}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="absolute top-1 right-1 h-8 w-8 p-0"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}


