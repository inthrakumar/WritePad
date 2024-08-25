import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import './globals.css';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import React from 'react';
import { ConvexClientProvider } from '@/providers/ClerkProvider';
export const metadata: Metadata = {
  title: 'WritePad',
  description: 'Text Editor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased max-w-10xl",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider >
            {children}
            <Toaster />
          </ConvexClientProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
