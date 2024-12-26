'use client'
import { useEffect, type ReactElement,useState } from "react"
import AvatarCircles, { Avatar } from "@/components/ui/avatar-circles"
import { useOthers,useSelf } from "@liveblocks/react/suspense"
export default function CollabaratorStack(): ReactElement {
    const [profiles, setProfiles] = useState<Avatar[]>([])
    const user = useSelf()
    const others = useOthers()
    useEffect(()=>{
        setProfiles(others.map((ele)=>{imageUrl:ele.info.avatarUrl}))

    },[others])
    return <AvatarCircles numPeople={profiles.length} avatarUrls={[...profiles,{imageUrl:user.info.avatarUrl}]}/>
}
