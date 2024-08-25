"use client"
import React from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useClerk } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
export default function Home() {
  const { signOut } = useClerk()
  return <main>
    <Authenticated>Logged in</Authenticated>
    <Unauthenticated>Logged out</Unauthenticated>
    <AuthLoading>Still loading</AuthLoading>
    <Button onClick={() => signOut({ redirectUrl: '/' })}>Sign Out</Button>
  </main>;
}
