import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FolderIcon, ChevronRight } from "lucide-react"
import { folderContents,ContentType } from '@/types/types';
type MoveFileModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (destinationId: string) => void
  records: folderContents
  currentRecord: ContentType | null
}

export function MoveFileModal({ isOpen, onClose, onConfirm, records, currentRecord }: MoveFileModalProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>("")

  const folders = records.filter((record) => record.type === "folder" && record._id !== currentRecord?._id)

  const handleConfirm = () => {
    if (selectedFolder) {
      onConfirm(selectedFolder)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Move {currentRecord?.roomTitle}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full pr-4">
          {folders.map((folder) => (
            <Button
              key={folder._id}
              variant="ghost"
              className={`w-full justify-start mb-1 ${selectedFolder === folder._id ? "bg-secondary" : ""}`}
              onClick={() => setSelectedFolder(folder._id)}
            >
              <FolderIcon className="mr-2 h-4 w-4" />
              {folder.roomTitle}
              {selectedFolder === folder._id && <ChevronRight className="ml-auto h-4 w-4" />}
            </Button>
          ))}
        </ScrollArea>
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
  )
}


