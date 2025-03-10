"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SignInPage from '@/scenes/SignIn';
import ForgotPassword from '@/scenes/ForgotPassword';
import Image from 'next/image';
import logo from '../../../../../public/Writepad.png';
import dark_logo from '../../../../../public/DarkMode_logo.png';
import { useTheme } from 'next-themes';

function Page() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isForget, setForgetState] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleState = () => {
        setForgetState((prevState) => !prevState);
    };

    if (!mounted) {

        return null;
    }

    const mainlogo = theme === 'light' ? logo : dark_logo;

    return (
        <Card className="flex w-fit gap-10 opacity-80 max-sm:opacity-90 max-w-[95vw] max-h-[80vh] max-sm:max-h-[95vh] items-center justify-center max-lg:px-0">
            <CardContent className="h-inherit flex items-center justify-center max-sm:hidden">
                <Image src={mainlogo.src} width={450} height={450} alt="Logo" className="object-cover" />
            </CardContent>
            <CardContent className="h-inherit flex items-center justify-center max-lg:w-1/2 max-sm:w-full max-sm:p-0 max-sm:m-3">
                {!isForget ? (
                    <SignInPage onToggle={toggleState} />
                ) : (
                    <ForgotPassword onToggle={toggleState} />
                )}
            </CardContent>
        </Card>
    );
}

export default Page;
