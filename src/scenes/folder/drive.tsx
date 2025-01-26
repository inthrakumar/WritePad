'use client'

import { useState } from 'react'
import { GridIcon, ListIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { UserRecordsGrid } from './drive-item-grid'
import { UserRecordsList } from './drive-item-list'
import { folderContents } from '@/types/types'
type FolderExplorer = {
  data: folderContents
}
export function UserRecordsExplorer({ data }: FolderExplorer) {
    console.log(data);
  const [isGridView, setIsGridView] = useState(true)

  return (
    <div className="p-4">
      <div className="flex justify-between items-end w-3/4 mb-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="view-toggle" className="sr-only">
            Toggle view
          </Label>
          <ListIcon className={`w-5 h-5 ${!isGridView ? 'text-primary' : 'text-muted-foreground'}`} />
          <Switch
            id="view-toggle"
            checked={isGridView}
            onCheckedChange={setIsGridView}
          />
          <GridIcon className={`w-5 h-5 ${isGridView ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
      </div>
      {isGridView ? (
        <UserRecordsGrid data={data} />
      ) : (
        <UserRecordsList data={data} />
      )}
    </div>
  )
}


