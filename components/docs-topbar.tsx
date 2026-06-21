"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { openCommandPalette } from "@/components/command-palette"
import { Button } from "@/registry/vitality/ui/button"

export function DocsTopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-6 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-baseline gap-2">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Vitality v6
        </Link>
        <span className="text-xs text-muted-foreground">shadcn / React</span>
      </div>
      <div className="flex items-center gap-2">
        <CommandTrigger />
        <ThemeToggle />
      </div>
    </header>
  )
}

function CommandTrigger() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={openCommandPalette}
      className="hidden gap-2 text-muted-foreground sm:inline-flex"
      aria-label="Search docs"
    >
      Search docs…
      <kbd className="pointer-events-none ml-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
        ⌘K
      </kbd>
    </Button>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    if (!mounted) return
    function onKey(e: KeyboardEvent) {
      if (!e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key.toLowerCase() !== "c") return
      const target = e.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return
        if (target.isContentEditable) return
      }
      e.preventDefault()
      setTheme(isDark ? "light" : "dark")
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mounted, isDark, setTheme])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme (Shift + C)"
      title="Toggle theme — Shift+C"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </Button>
  )
}
