"use client";
import React, { useState, useEffect } from 'react';
import SignUpPage from '@/scenes/SignUp';
import { Card, CardContent } from '@/components/ui/card';
import logo from '../../../../../public/Writepad.png';
import dark_logo from '../../../../../public/DarkMode_logo.png';
import Image from 'next/image';
import { useTheme } from 'next-themes';

function Page() {  // Renamed the component to 'Page' in PascalCase
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme(); // Move this above the conditional check

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const mainlogo = theme === 'light' ? logo : dark_logo;

    return (
        <Card className='flex w-fit gap-10 opacity-80 max-sm:opacity-90  max-w-[85vw] max-h-[80vh] max-sm:max-h-[95vh] items-center justify-center max-lg:px-0'>
            <CardContent className='h-inherit flex items-center justify-center max-sm:hidden'>
                <Image src={mainlogo} width={450} height={450} alt='Logo' className='object-cover' />
            </CardContent>
            <CardContent className='h-inherit flex items-center justify-center max-lg:w-1/2 max-sm:w-full'>
                <SignUpPage />
            </CardContent>
        </Card>
    );
}

export default Page;
