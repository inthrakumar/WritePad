'use client'

import React from 'react'
import Header from './Header'
import { usePathname } from 'next/navigation'
function Layout({ children }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = ['/sign-in', '/sign-up'].includes(pathname);
    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            {
                !isAuthPage && <Header />

            }
            <div className={`flex-grow ${!isAuthPage ? 'mt-[76px]' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default Layout
