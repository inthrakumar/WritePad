"use client";
import React, { useEffect } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";
export default function Home() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: '/' });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    // This effect could be used for additional side effects when the component mounts
  }, []);

  return (
    <main>
      <Authenticated>
        <p>Logged in</p>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Authenticated>
      <Unauthenticated>
        <p>Logged out</p>
        {/* Add any additional content or components for unauthenticated users */}
      </Unauthenticated>
      <AuthLoading>
        <p>Still loading</p>
      </AuthLoading>
    </main>
  );
}
