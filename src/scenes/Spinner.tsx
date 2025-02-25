"use client"

import { motion } from "framer-motion"

export default function Spinner() {
  const dots = Array(5).fill(0)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const dot = {
    hidden: {
      y: "0%",
      scale: 0.8,
      opacity: 0.5,
    },
    show: {
      y: "-50%",
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <motion.div className="flex gap-4" variants={container} initial="hidden" animate="show">
        {dots.map((_, i) => (
          <motion.span
            key={i}
            variants={dot}
            className="size-3 rounded-full bg-primary shadow-lg shadow-primary/30 md:size-4 lg:size-5"
          />
        ))}
      </motion.div>
    </div>
  )
}


