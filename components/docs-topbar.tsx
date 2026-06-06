"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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

// Static trigger for v1 — VDS-7 wires this to the cmdk command palette.
function CommandTrigger() {
  return (
    <Button
      variant="outline"
      size="sm"
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

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </Button>
  )
}
