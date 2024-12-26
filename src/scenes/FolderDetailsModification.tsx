import { type ReactElement } from "react"
import { DropdownMenuLabel,DropdownMenuContent,DropdownMenu,DropdownMenuTrigger }from "@/components/ui/dropdown-menu"
import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog"
import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function FolderDetailsModification({setData ,name,roomId,id}): ReactElement {
    return(<DropdownMenu>
            <DropdownMenuTrigger><Ellipsis/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuLabel></DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>)

}






