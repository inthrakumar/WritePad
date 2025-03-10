'use client'
import React from 'react'
import Header from './Header'
import { usePathname } from 'next/navigation'
import { Toaster } from "@/components/ui/toaster"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
function Layout({ children }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = ['/sign-in', '/sign-up'].includes(pathname);
    return (
        <div className='flex items-center justify-between flex-col   min-w-[100vw] w-full min-h-screen'>
            {
                !isAuthPage && <Header />

            }
            <div className={`flex-grow  ${!isAuthPage ? 'mt-[76px]' : ''}`}>
                {children}
                <Toaster />
            </div>
        </div>
    )
}

export default Layout
