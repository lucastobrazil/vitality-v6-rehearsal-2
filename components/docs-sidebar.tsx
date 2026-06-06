"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ListFilter } from "lucide-react"
import { useState } from "react"

import { SidebarFilter } from "@/components/sidebar-filter"
import { classify, listSlugs } from "@/lib/classify"
import { listBlocks } from "@/lib/blocks"
import { cn } from "@/lib/utils"

const GUIDES: Array<{ slug: string; label: string }> = [
  { slug: "getting-started", label: "Getting Started" },
  { slug: "installation", label: "Installation" },
  { slug: "design-tokens", label: "Design Tokens" },
]

export function DocsSidebar() {
  const pathname = usePathname()
  const components = listSlugs()
  const blocks = listBlocks()

  const [filterOpen, setFilterOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [vitalityOnly, setVitalityOnly] = useState(false)

  const filteredComponents = components.filter((slug) => {
    const status = classify(slug)
    if (vitalityOnly && status === "Stock") return false
    if (query.trim() === "") return true
    return slug.toLowerCase().includes(query.trim().toLowerCase())
  })

  return (
    <nav className="flex flex-col gap-8 py-6 text-sm" aria-label="Docs navigation">
      <Group title="Guides">
        {GUIDES.map((g) => (
          <NavItem
            key={g.slug}
            href={`/guides/${g.slug}`}
            label={g.label}
            active={pathname === `/guides/${g.slug}` || pathname === `/guides/${g.slug}/`}
          />
        ))}
      </Group>

      <Group title="Blocks">
        {blocks.length === 0 ? (
          <p className="px-2 text-xs text-muted-foreground">No blocks yet.</p>
        ) : (
          blocks.map((slug) => (
            <NavItem
              key={slug}
              href={`/blocks/${slug}`}
              label={titlecase(slug)}
              active={pathname === `/blocks/${slug}` || pathname === `/blocks/${slug}/`}
            />
          ))
        )}
      </Group>

      <Group
        title="Components"
        action={
          <button
            type="button"
            aria-label={filterOpen ? "Hide filter" : "Filter components"}
            aria-expanded={filterOpen}
            onClick={() => setFilterOpen((open) => !open)}
            className={cn(
              "rounded p-1 transition-colors",
              filterOpen
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <ListFilter className="h-3.5 w-3.5" />
          </button>
        }
        filter={
          filterOpen ? (
            <SidebarFilter
              query={query}
              onQueryChange={setQuery}
              vitalityOnly={vitalityOnly}
              onVitalityOnlyChange={setVitalityOnly}
            />
          ) : null
        }
      >
        {filteredComponents.length === 0 ? (
          <li className="px-2 py-2 text-xs text-muted-foreground">No matches.</li>
        ) : (
          filteredComponents.map((slug) => {
            const status = classify(slug)
            const isCustomised = status !== "Stock"
            return (
              <NavItem
                key={slug}
                href={`/components/${slug}`}
                label={titlecase(slug)}
                active={pathname === `/components/${slug}` || pathname === `/components/${slug}/`}
                indicator={isCustomised}
              />
            )
          })
        )}
      </Group>
    </nav>
  )
}

function Group({
  title,
  action,
  filter,
  children,
}: {
  title: string
  action?: React.ReactNode
  filter?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        {action}
      </div>
      {filter}
      <ul className="flex flex-col">{children}</ul>
    </div>
  )
}

function NavItem({
  href,
  label,
  active,
  indicator,
}: {
  href: string
  label: string
  active: boolean
  indicator?: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
          active
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        )}
      >
        <span>{label}</span>
        {indicator ? (
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-primary"
            title="Vitality-touched"
          />
        ) : null}
      </Link>
    </li>
  )
}

function titlecase(slug: string): string {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}
