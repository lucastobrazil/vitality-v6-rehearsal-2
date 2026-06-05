"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Cog, FileText, LayoutDashboard, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/registry/vitality/ui/separator"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavSection {
  title?: string
  items: NavItem[]
}

interface SideNavProps {
  brand?: string
  sections?: NavSection[]
  className?: string
}

const DEFAULT_SECTIONS: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Patients", href: "/patients", icon: Users },
      { label: "Appointments", href: "/appointments", icon: Calendar },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Documents", href: "/documents", icon: FileText },
      { label: "Settings", href: "/settings", icon: Cog },
    ],
  },
]

function SideNav({
  brand = "Vitality",
  sections = DEFAULT_SECTIONS,
  className,
}: SideNavProps) {
  const pathname = usePathname()

  return (
    <aside
      data-slot="side-nav"
      className={cn(
        "flex h-screen w-64 flex-col gap-3 border-r bg-background p-3",
        className
      )}
    >
      <div className="px-2 py-1.5">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {brand}
        </Link>
      </div>

      <Separator />

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="flex flex-col gap-1">
            {section.title ? (
              <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">
                {section.title}
              </div>
            ) : null}
            {section.items.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    active
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export { SideNav }
