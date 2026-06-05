import type { Metadata } from "next"
import Link from "next/link"

import "./globals.css"

export const metadata: Metadata = {
  title: "Vitality v6 — design system",
  description: "Vitality v6 component registry for shadcn / Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <header className="flex h-14 items-center gap-6 border-b bg-background px-6">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Vitality v6
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/components"
              className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Components
            </Link>
            <Link
              href="/blocks"
              className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Blocks
            </Link>
            <Link
              href="/getting-started"
              className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Getting started
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-8">{children}</main>
      </body>
    </html>
  )
}
