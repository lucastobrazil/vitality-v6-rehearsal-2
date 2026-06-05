import Link from "next/link"
import fs from "fs"
import path from "path"

import { listRegistryItems } from "@/lib/code-extractor"

export default function Home() {
  const components = listRegistryItems("ui")
  const blocks = listRegistryItems("blocks")

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">Vitality v6</h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          A shadcn-based component registry tuned for Magentus product UI. Install
          components individually via the shadcn CLI — they bring their Vitality
          customisations with them.
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href="/getting-started"
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Getting started
          </Link>
          <Link
            href="/components"
            className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse components
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Components</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {components.length} customised shadcn components.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {components.map((name) => (
            <li key={name}>
              <Link
                href={`/components/${name}`}
                className="block rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Blocks</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {blocks.length} composed patterns ready to install.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {blocks.map((name) => (
            <li key={name}>
              <Link
                href={`/blocks/${name}`}
                className="block rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
