import React from 'react';
import bg from '../../../public/bg.jpg';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`min-h-screen flex items-center justify-center min-w-[100vw]`}
            style={{
                backgroundImage: `url(${bg.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {children}
        </div>
    );
}
