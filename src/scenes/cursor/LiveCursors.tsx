'use client'
import { useOthers,useMyPresence } from "@liveblocks/react/suspense";
import { type ReactElement } from "react"
import Cursor from "./Cursor";
import styles from '../../css/Cursor.module.css'
import { numberToHexColor } from "@/utils/cursorutils";
export default function LiveCursors(): ReactElement {
    const [{cursor},updateMyPresence] = useMyPresence();
    const others = useOthers()
    return <div  className={styles.container}
      onPointerMove={(event) => {
        // Update the user cursor position on every pointer move
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        });
      }}
      onPointerLeave={() =>
        // When the pointer goes out, set cursor to null
        updateMyPresence({
          cursor: null,
        })
      }>
         {
        /**
         * Iterate over other users and display a cursor based on their presence
         */
        others.map(({info, connectionId, presence }) => {
          if (presence.cursor === null) {
            return null;
          }

          return (
            <Cursor
              key={`cursor-${connectionId}`}
              name={info.username}
              // connectionId is an integer that is incremented at every new connections
              // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
              color={numberToHexColor(connectionId)}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          );
        })
      } 
    </div>
}
