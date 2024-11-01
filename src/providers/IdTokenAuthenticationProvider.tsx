"use client";
import React from "react";
import { ReactNode } from "react";
import {
    LiveblocksProvider,

    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Spinner from "@/scenes/Spinner";
function IdTokenAuthenticator({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider
            authEndpoint={'/api/liveblocks-auth'}
            backgroundKeepAliveTimeout={15 * 60 * 1000}
        >
            <ClientSideSuspense fallback={<Spinner />}>
                {children}
            </ClientSideSuspense>

        </LiveblocksProvider >

    );
}

export default IdTokenAuthenticator
