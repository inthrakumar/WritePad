import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SignUp',
    description: 'Text Editor',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        { children });
}
