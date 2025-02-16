'use client';
import type { ReactNode } from 'react';
import { useOthers, useMyPresence } from '@liveblocks/react/suspense';
import { Children, type ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import {FollowPointer as Cursor} from './Cursor';
import styles from '../../css/Cursor.module.css';
import { nameToHex } from '@/utils/cursorutils';
export default function LiveCursorProvider({
    children,
}: {
    children: ReactNode;
}): ReactElement {
    const [{ cursor }, updateMyPresence] = useMyPresence();
    const others = useOthers();
    return (
        <div
            className={styles.container}
            onPointerMove={(event) => {
                updateMyPresence({
                    cursor: {
                        x: Math.round(event.clientX),
                        y: Math.round(event.clientY),
                    },
                });
            }}
            onPointerLeave={() =>
                updateMyPresence({
                    cursor: null,
                })
            }
        >
            {
                /**
                 * Iterate over other users and display a cursor based on their presence
                 */
                others.map(({ info, connectionId, presence }) => {
                    if (presence.cursor === null) {
                        return null;
                    }

                    return (
                        <AnimatePresence>
                            <Cursor
                                key={`cursor-${connectionId}`}
                                name={info.username}
                                // connectionId is an integer that is incremented at every new connections
                                // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
                                color={nameToHex(info.email + String(connectionId))}
                                x={presence.cursor.x}
                                y={presence.cursor.y}
                            />
                        </AnimatePresence>
                    );
                })
            }
            {children}
        </div>
    );
}
