"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: 2 | 3
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function DocsToc() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return
    const nodes = Array.from(main.querySelectorAll<HTMLElement>("h2, h3"))
    const items: Heading[] = nodes.map((el) => {
      if (!el.id) el.id = slugify(el.textContent ?? "")
      return {
        id: el.id,
        text: el.textContent ?? "",
        level: el.tagName === "H2" ? 2 : 3,
      }
    })
    setHeadings(items)

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          // Pick the topmost visible heading.
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-20% 0% -70% 0%" }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto py-6 text-sm xl:block" aria-label="On this page">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        On this page
      </p>
      <ul className="flex flex-col gap-1.5">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "pl-3")}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block transition-colors hover:text-foreground",
                activeId === h.id ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
