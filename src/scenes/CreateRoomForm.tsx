import React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, File, Folder } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { useUser } from "@clerk/clerk-react"
import { CreateRoom } from "@/utils/RoomUtils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const createItemSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

type CreateItemFormData = z.infer<typeof createItemSchema>

interface CreateItemFormProps {
  type: "file" | "folder"
  onClose: () => void
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({ type, onClose }) => {
  const form = useForm<CreateItemFormData>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: "Untitled",
    },
  })
  const userDetails = useUser()
  const pathname = usePathname()

  const onSubmit: SubmitHandler<CreateItemFormData> = async (values) => {
    try {
      if (userDetails?.user) {
        await CreateRoom({
          userId: userDetails.user.id,
          parent: pathname,
          type: type,
          email: userDetails.user.emailAddresses[0].emailAddress,
          title: values.name,
        })
      }
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{type === "file" ? "Filename" : "Folder name"}</FormLabel>
              <FormControl>
                <Input placeholder="Untitled" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}

const NewCreation: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [itemType, setItemType] = React.useState<"file" | "folder">("file")

  const handleNewItem = (type: "file" | "folder") => {
    setItemType(type)
    setDialogOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex gap-1 text-sm">
            New <Plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handleNewItem("file")}>
            <File className="mr-2 h-4 w-4" />
            <span>New File</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleNewItem("folder")}>
            <Folder className="mr-2 h-4 w-4" />
            <span>New Folder</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <CreateItemForm type={itemType} onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewCreation


