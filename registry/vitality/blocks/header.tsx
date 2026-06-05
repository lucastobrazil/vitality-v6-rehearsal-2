import * as React from "react"
import Link from "next/link"
import { Bell, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/vitality/ui/avatar"
import { Button } from "@/registry/vitality/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/vitality/ui/input-group"

interface HeaderProps {
  brand?: string
  nav?: Array<{ label: string; href: string }>
}

function Header({
  brand = "Vitality",
  nav = [
    { label: "Dashboard", href: "/" },
    { label: "Patients", href: "/patients" },
    { label: "Appointments", href: "/appointments" },
  ],
}: HeaderProps) {
  return (
    <header
      data-slot="header"
      className="flex h-14 items-center justify-between gap-4 border-b bg-background px-6"
    >
      <div className="flex items-center gap-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {brand}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <InputGroup className="hidden w-64 md:flex">
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search…" />
        </InputGroup>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <Avatar>
          <AvatarImage src="" alt="" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export { Header }
