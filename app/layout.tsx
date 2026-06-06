import type { Metadata } from "next"

import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { DocsTopBar } from "@/components/docs-topbar"

import { Providers } from "./providers"
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
        <Providers>
          <DocsTopBar />
          <div className="mx-auto flex w-full max-w-7xl gap-8 px-6">
            <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[240px] shrink-0 overflow-y-auto md:block">
              <DocsSidebar />
            </aside>
            <main className="min-w-0 flex-1 py-10">{children}</main>
            <aside className="hidden w-[200px] shrink-0 xl:block">
              <DocsToc />
            </aside>
          </div>
        </Providers>
      </body>
    </html>
  )
}
