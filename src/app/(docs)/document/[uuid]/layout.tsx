
import { useEffect } from 'react';

export default function DocLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>{children}</div>
    );
}
