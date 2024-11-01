'use client'
import React from 'react'
import CreateRoomForm from '@/scenes/CreateRoomForm'
import { BreadCrumbs } from '@/scenes/ContentBreadCrumbs'
function page() {
    return (
        <div className='w-[100vw] flex flex-col items-end justify-around p-5 pr-7'>
            <BreadCrumbs />
            <CreateRoomForm />
        </div>
    )
}

export default page
