"use client";
import React from "react";
import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useUser } from "@clerk/clerk-react";
function IdTokenAuthenticator({ children }: { children: ReactNode }) {
    const userDetails = useUser();
    return (
        <LiveblocksProvider
            authEndpoint={async () => {
                const headers = {


                    "Content-Type": "application/json",
                };

                const body = JSON.stringify({

                    user_id: userDetails.user?.id
                    ,
                });

                const response = await fetch("/api/liveblocks-auth", {
                    method: "POST",
                    headers,
                    body,
                });

                return await response.json();
            }}
        >
            <RoomProvider id="my-room">
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider >

    );
}

export default IdTokenAuthenticator
