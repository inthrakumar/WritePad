import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import IdTokenAuthenticator from '../../providers/IdTokenAuthenticationProvider'
export const metadata: Metadata = {
    title: 'MY Docs',
    description: 'Text Editor',
};

export default function DocumentsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <IdTokenAuthenticator >{children}</IdTokenAuthenticator>
    );
}
