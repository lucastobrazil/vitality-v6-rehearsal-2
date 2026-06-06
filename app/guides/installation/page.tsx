import { registryUrl } from "@/lib/code-extractor"

export default function Installation() {
  const base = registryUrl()
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          The Vitality registry installs into any shadcn-compatible Next.js + Tailwind v4
          project. Per-component install lets you adopt incrementally.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Prerequisites</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Next.js with the App Router (Next 15+ recommended).</li>
          <li>Tailwind CSS v4.</li>
          <li>
            <code className="rounded bg-muted px-1.5 py-0.5">shadcn</code> CLI initialised
            with the <strong>radix</strong> base and <strong>nova</strong> preset.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Initialise shadcn</h2>
        <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{`npx shadcn@latest init --base radix --preset nova`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Install a component</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each component is a single shadcn registry entry. Components land under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">registry/vitality/ui/</code> per
          this docs site's <code className="rounded bg-muted px-1.5 py-0.5">components.json</code>{" "}
          alias.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{`npx shadcn@latest add ${base}/r/<name>.json`}</code>
        </pre>
        <p className="mt-2 text-sm text-muted-foreground">
          Replace <code className="rounded bg-muted px-1.5 py-0.5">&lt;name&gt;</code> with
          any component slug from the sidebar (e.g. <code className="rounded bg-muted px-1.5 py-0.5">button</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">alert</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">date-picker</code>).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Apply the theme</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste the Vitality v6 <code className="rounded bg-muted px-1.5 py-0.5">globals.css</code>{" "}
          (OKLCH palette + severity tokens + radius scale) into your project's{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">app/globals.css</code>. See the{" "}
          <a href="/guides/design-tokens" className="underline">Design Tokens</a> guide for the full token surface.
        </p>
      </section>
    </article>
  )
}
