"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import * as motion from "motion/react-client"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" shape="pill" className="w-9 h-9" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      shape="pill"
      className="w-9 h-9 relative overflow-hidden"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 30 : 0,
          opacity: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 0 : -30,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
