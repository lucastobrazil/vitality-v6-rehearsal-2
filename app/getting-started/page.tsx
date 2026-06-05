import { registryUrl, mcpConfigSnippet } from "@/lib/code-extractor"

export default function GettingStarted() {
  const base = registryUrl()
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Getting started</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Vitality v6 is a shadcn registry — install components individually via the
          shadcn CLI. No package install, no lock-step versioning.
        </p>
      </header>

      <section>
        <h2 className="text-base font-semibold">Initial setup</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
          <li>
            Scaffold a fresh Next.js + Tailwind v4 + TypeScript project (App Router).
          </li>
          <li>
            Run <code className="rounded bg-muted px-1.5 py-0.5">npx shadcn@latest init --base radix --preset nova</code> — the Radix base + Nova preset are required.
          </li>
          <li>Add components one at a time via the install commands below.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-base font-semibold">Install a component</h2>
        <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{`npx shadcn@latest add ${base}/r/button.json
npx shadcn@latest add ${base}/r/input.json
npx shadcn@latest add ${base}/r/spinner.json`}</code>
        </pre>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse every component at <a href="/components" className="underline">/components</a>.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold">Use with a shadcn-aware MCP client</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add this server entry so AI tools can list + install components by name:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{mcpConfigSnippet(base)}</code>
        </pre>
      </section>
    </article>
  )
}
