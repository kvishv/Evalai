"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedThemeTogglerProps = {
  className?: string
}

export const AnimatedThemeToggler = ({ className }: AnimatedThemeTogglerProps) => {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setDarkMode(isDark)
    setMounted(true)
  }, [])

  const onToggle = useCallback(async () => {
    if (!buttonRef.current) return

    const toggled = !darkMode

    if ("startViewTransition" in document) {
      // @ts-ignore
      await document.startViewTransition(() => {
        flushSync(() => {
          setDarkMode(toggled)
          document.documentElement.classList.toggle("dark", toggled)
          localStorage.setItem("theme", toggled ? "dark" : "light")
        })
      }).ready
    } else {
      setDarkMode(toggled)
      document.documentElement.classList.toggle("dark", toggled)
      localStorage.setItem("theme", toggled ? "dark" : "light")
    }
  }, [darkMode])

  if (!mounted) return null

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Switch theme"
      className={cn(
        "flex items-center justify-center p-2 rounded-full cursor-pointer",
        className
      )}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, scale: 0.6, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-yellow-400"
          >
            <Sun size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-black dark:text-white"
          >
            <Moon size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
