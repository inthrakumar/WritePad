'use client'
import React, { useEffect } from 'react'
import { getSharedRooms } from '@/utils/RoomUtils'
import { useUser } from '@clerk/clerk-react'
const SharedRoomPage = () => {
    const user = useUser();
    useEffect(() => {

        const fetchSharedRooms = async () => {
            try {
                if (user.isSignedIn && user.user) {

                    const rooms = await getSharedRooms(user.user?.id);


                }
            } catch (error) {

            }

        }
        fetchSharedRooms();




    }, [user])
    return (
        <div>SharedRoomPage</div>
    )
}

export default SharedRoomPage

