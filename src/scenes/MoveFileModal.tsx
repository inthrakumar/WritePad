import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FolderIcon, X } from "lucide-react"
import type { MoveModalProps } from "@/types/types"
export function MoveFileModal({ isOpen, onClose, onConfirm, records, currentRecord }: MoveModalProps) {
  const pathname = usePathname()
  const [selectedFolder, setSelectedFolder] = useState<string>("")
  const [isWarn, setWarn] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      setSelectedFolder("")
      setWarn(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setSelectedFolder("")
    setWarn(false)
    onClose()
  }

  const handleConfirm = () => {
    setWarn(false)
    if (selectedFolder !== "") {
      onConfirm(`${pathname}/${encodeURIComponent(selectedFolder)}`)
    } else {
      setWarn(true)
    }
  }

  if (!isOpen || !records || !currentRecord) {
    return null
  }

  const folders = records.filter((record) => record.type === "folder" && record._id !== currentRecord?._id)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base font-semibold">Move {currentRecord?.roomTitle}</h2>
          <Button variant="ghost" onClick={handleClose} className="p-1">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-4">Select a folder to move the file to</p>
          <ScrollArea className="h-[300px] w-full pr-4 max-h-[300px] border rounded">
            {folders.map((folder) => (
              <Button
                key={folder._id}
                variant="ghost"
                className={`w-full justify-start mb-1 ${selectedFolder === folder.roomTitle ? "bg-secondary" : ""}`}
                onClick={() => setSelectedFolder(folder.roomTitle)}
              >
                <FolderIcon className="mr-2 h-4 w-4" />
                {folder.roomTitle}
              </Button>
            ))}
          </ScrollArea>
          {isWarn && <div className="text-red-500 text-sm mt-2">Please select a folder</div>}
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedFolder}>
            Move
          </Button>
        </div>
      </div>
    </div>
  )
}




