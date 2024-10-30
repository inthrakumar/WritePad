import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import IdTokenAuthenticator from '../../providers/IdTokenAuthenticationProvider'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
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
        <IdTokenAuthenticator >
            <Provider store={store}>
                {children}
            </Provider>
        </IdTokenAuthenticator>
    );
}
