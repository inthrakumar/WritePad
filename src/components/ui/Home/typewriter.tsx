"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimate, useInView, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Pause, Play, RotateCcw } from "lucide-react"

interface TypewriterProps {
  words: {
    text: string
    className?: string
    delay?: number // Optional delay before typing this word
  }[]
  className?: string
  cursorClassName?: string
  speed?: "slow" | "normal" | "fast" // Typing speed
  repeat?: boolean // Whether to repeat the animation
  autoStart?: boolean // Whether to start typing automatically
  soundEnabled?: boolean // Whether to enable typing sounds
  onComplete?: () => void // Callback when typing is complete
}

const typeSound = new Audio("/type.mp3") // You would need to add this sound file
typeSound.volume = 0.2

const getTypingDuration = (speed: "slow" | "normal" | "fast") => {
  switch (speed) {
    case "slow":
      return 0.2
    case "fast":
      return 0.05
    default:
      return 0.1
  }
}

export const EnhancedTypewriterEffect = ({
  words,
  className,
  cursorClassName,
  speed = "normal",
  repeat = false,
  autoStart = true,
  soundEnabled: initialSoundEnabled = false,
  onComplete,
}: TypewriterProps) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  const [isPaused, setIsPaused] = useState(!autoStart)
  const [isComplete, setIsComplete] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(initialSoundEnabled)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const animationRef = useRef<Animation>()

  // Split text inside of words into array of characters
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }))

  const playTypeSound = useCallback(() => {
    if (soundEnabled) {
      typeSound.currentTime = 0
      typeSound.play().catch(() => {
        // Handle audio play error silently
      })
    }
  }, [soundEnabled])

  const startTyping = useCallback(async () => {
    setIsComplete(false)
    setCurrentWordIndex(0)

    for (let wordIndex = 0; wordIndex < wordsArray.length; wordIndex++) {
      const word = wordsArray[wordIndex]
      setCurrentWordIndex(wordIndex)

      // Wait for optional delay before typing this word
      if (word.delay) {
        await new Promise((resolve) => setTimeout(resolve, word.delay))
      }

      // Type each character in the word
      const chars = scope.current.querySelectorAll(`[data-word="${wordIndex}"] span`)
      for (let i = 0; i < chars.length; i++) {
        if (!isPaused) {
          await animate(
            chars[i],
            {
              display: "inline-block",
              opacity: 1,
              scale: [1.2, 1],
            },
            {
              duration: getTypingDuration(speed),
              ease: "easeOut",
            },
          )
          playTypeSound()
        }
      }
    }

    setIsComplete(true)
    onComplete?.()

    if (repeat) {
      // Reset and repeat
      await animate(
        "span",
        {
          display: "none",
          opacity: 0,
        },
        {
          duration: 0.3,
          delay: 1,
        },
      )
      startTyping()
    }
  }, [wordsArray, animate, isPaused, speed, playTypeSound, repeat, onComplete, scope])

  useEffect(() => {
    if (isInView && !isPaused) {
      startTyping()
    }
  }, [isInView, isPaused, startTyping])

  const handlePause = () => {
    setIsPaused(true)
    animationRef.current?.pause()
  }

  const handleResume = () => {
    setIsPaused(false)
    animationRef.current?.play()
  }

  const handleRestart = () => {
    animate(
      "span",
      {
        display: "none",
        opacity: 0,
      },
      {
        duration: 0.3,
      },
    )
    setTimeout(() => {
      setIsPaused(false)
      startTyping()
    }, 400)
  }

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        <AnimatePresence>
          {wordsArray.map((word, idx) => {
            return (
              <div
                key={`word-${idx}`}
                data-word={idx}
                className={cn("inline-block", currentWordIndex === idx && "relative")}
              >
                {currentWordIndex === idx && (
                  <motion.div
                    className="absolute -left-1 right-1 -bottom-1 h-[2px] bg-orange-400/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                {word.text.map((char, index) => (
                  <motion.span
                    initial={{ display: "none", opacity: 0 }}
                    key={`char-${index}`}
                    className={cn(`dark:text-white text-black opacity-0 hidden`, word.className)}
                  >
                    {char}
                  </motion.span>
                ))}
                &nbsp;
              </div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center", className)}>
        {renderWords()}
      </div>

      <div className="flex items-center gap-2">
       
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={isPaused ? handleResume : handlePause}>
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          <span className="sr-only">{isPaused ? "Resume typing" : "Pause typing"}</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRestart}>
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Restart typing</span>
        </Button>
      </div>
    </div>
  )
}

export const EnhancedTypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  speed = "normal",
}: TypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  // Split text inside of words into array of characters
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }))

  useEffect(() => {
    if (isInView && containerRef.current) {
      const container = containerRef.current
      const textWidth = container.scrollWidth

      animate(
        scope.current,
        {
          width: [0, textWidth],
        },
        {
          duration: 2,
          ease: "linear",
          delay: 0.5,
        },
      )
    }
  }, [isInView, animate, scope.current]) // Added scope.current to dependencies

  const renderWords = () => {
    return (
      <div ref={containerRef}>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className={cn("inline-block", currentWordIndex === idx && "relative")}>
              {currentWordIndex === idx && (
                <motion.div
                  className="absolute -left-1 right-1 -bottom-1 h-[2px] bg-orange-400/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
              {word.text.map((char, index) => (
                <motion.span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black`, word.className)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: getTypingDuration(speed),
                    delay: index * getTypingDuration(speed),
                  }}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        ref={scope}
        className="overflow-hidden"
        initial={{
          width: 0,
        }}
      >
        <div className="p-4 text-xs sm:text-base md:text-xl lg:text:3xl xl:text-4xl font-bold whitespace-nowrap">
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-orange-500", cursorClassName)}
      />
    </div>
  )
}

