import React from 'react'
import ForgotEmailForm from '@/app_components/ForgotEmailForm'
function ForgotPassword({ onToggle }: { onToggle: () => void }) {
    return (
        <div className='grid  items-center px-4 sm:justify-center max-sm:'>


            <ForgotEmailForm onToggle={onToggle} />

        </div>
    )
}

export default ForgotPassword
