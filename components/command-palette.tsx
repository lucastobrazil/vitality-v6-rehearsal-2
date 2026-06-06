"use client"

import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import searchIndex from "@/public/_data/search-index.json"
import { cn } from "@/lib/utils"

type SearchItem = {
  label: string
  type: "component" | "block" | "guide"
  url: string
}

const OPEN_EVENT = "vitality:open-palette"

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey
      if (isCmdOrCtrl && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  const items = searchIndex as SearchItem[]
  const components = items.filter((i) => i.type === "component")
  const blocks = items.filter((i) => i.type === "block")
  const guides = items.filter((i) => i.type === "guide")

  const handleSelect = (url: string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search docs"
        className={cn(
          "fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl"
        )}
      >
        <Command.Input
          placeholder="Search components, blocks, guides…"
          className="w-full border-b border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <Command.List className="max-h-[320px] overflow-y-auto p-2">
          <Command.Empty className="px-2 py-6 text-center text-sm text-muted-foreground">
            No results.
          </Command.Empty>
          {components.length > 0 ? (
            <Command.Group
              heading="Components"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {components.map((item) => (
                <PaletteItem
                  key={item.url}
                  label={item.label}
                  hint="Component"
                  onSelect={() => handleSelect(item.url)}
                />
              ))}
            </Command.Group>
          ) : null}
          {blocks.length > 0 ? (
            <Command.Group
              heading="Blocks"
              className="mt-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {blocks.map((item) => (
                <PaletteItem
                  key={item.url}
                  label={item.label}
                  hint="Block"
                  onSelect={() => handleSelect(item.url)}
                />
              ))}
            </Command.Group>
          ) : null}
          {guides.length > 0 ? (
            <Command.Group
              heading="Guides"
              className="mt-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {guides.map((item) => (
                <PaletteItem
                  key={item.url}
                  label={item.label}
                  hint="Guide"
                  onSelect={() => handleSelect(item.url)}
                />
              ))}
            </Command.Group>
          ) : null}
        </Command.List>
      </Command.Dialog>
    </>
  )
}

function PaletteItem({
  label,
  hint,
  onSelect,
}: {
  label: string
  hint: string
  onSelect: () => void
}) {
  return (
    <Command.Item
      value={`${label} ${hint}`}
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm aria-selected:bg-muted aria-selected:text-foreground"
    >
      <span>{label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </Command.Item>
  )
}
