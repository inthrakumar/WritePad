'use client'
import { useEffect, type ReactElement,useState } from "react"
import AvatarCircles, { Avatar } from "@/components/ui/avatar-circles"
import { useOthers } from "@liveblocks/react/suspense"
export default function CollabaratorStack(): ReactElement {
    const [profiles, setProfiles] = useState<Avatar[]>([])
    const others = useOthers()
    useEffect(()=>{
        setProfiles(others.map((ele)=>{imageUrl:ele.info.avatarUrl}))

    },[others])
    return <AvatarCircles numPeople={3} avatarUrls={profiles}/>
}
