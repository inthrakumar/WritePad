import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "../providers/ClerkProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WritePad",
  description: "TextEditor App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><ThemeProvider attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange> <ConvexClientProvider>{children}</ConvexClientProvider></ThemeProvider></body>
    </html>
  );
}
