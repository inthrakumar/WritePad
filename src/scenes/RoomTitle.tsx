import React from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
const RoomTitle = () => {
    const [title, setTitle] = useState('')
    const [disabled, setDisabled] = useState(false);
    const handleChange = () => {

    }
    return (
        <div>
            <Input type="text" disabled={disabled} className='w-[30vw] max-w-[30vw]' />

        </div>
    )
}

export default RoomTitle
