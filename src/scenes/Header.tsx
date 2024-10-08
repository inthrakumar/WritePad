"use client"

import React from 'react'
import '@fontsource/poppins'
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useClerk } from "@clerk/clerk-react";
import Image from 'next/image'
import logo from '../../public/W (1).svg'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { RiLoader5Line } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/clerk-react";
import { getRandomAnonymousName } from "../utils/AnonymousUtils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


function Header() {
    const user = useUser();

    let userName = user.user?.fullName || user.user?.firstName || user.user?.lastName;
    if (!user.isSignedIn)
        userName = getRandomAnonymousName();

    const { signOut } = useClerk();
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await signOut({ redirectUrl: '/' });
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };
    return (
        <div className='max-w-10xl w-[100vw] font-poppins flex justify-between items-center fixed top-0  max-h-[75px] shadow-sm bg-white '>
            <Link href={'/'}>
                <div className='flex items-center justify-center gap-4'>
                    <span>
                        <Image
                            src={logo}
                            alt='logo'
                            width={75}
                            height={75}
                        />
                    </span>
                    <h1 className='text-4xl tracking-tight text-orange-700'>
                        Write <span className='text-black'>Pad</span>
                    </h1>

                </div></Link>
            <div className='flex text-lg items-center justify-center gap-5 mr-8'>
                <Link href={'/docs'}>
                    <span className='tracking-tight hover:text-orange-700 '>My Docs</span></Link>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Avatar>
                            {
                                user.isSignedIn ? (<AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`}></AvatarImage>) : (
                                    <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`}></AvatarImage>
                                )
                            }
                        </Avatar></TooltipTrigger>
                        <TooltipContent>
                            <p>{userName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>




                <div>
                    <Authenticated>
                        <Button onClick={handleSignOut}>Sign Out</Button>
                    </Authenticated>
                    <Unauthenticated>
                        <Button onClick={() => {
                            router.push('/sign-in')
                        }}>SignIn</Button>
                    </Unauthenticated>
                    <AuthLoading>
                        <Button ><RiLoader5Line size={30} className='animate-spin' /></Button>
                    </AuthLoading>
                </div>

            </div>

        </div>
    )
}

export default Header
