"use client"
import { motion } from "framer-motion"
import type { ColorProps } from "@/types/types"

export default function Cursor({ name, color, x, y }: ColorProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex:9999
      }}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    >
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: "20px",
          left: "10px",
          backgroundColor: color,
          borderRadius: "4px",
          padding: "2px 6px",
          fontSize: "12px",
          color: "white",
          whiteSpace: "nowrap",

        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {name.toLowerCase()}
      </motion.div>
    </motion.div>
  )
}


