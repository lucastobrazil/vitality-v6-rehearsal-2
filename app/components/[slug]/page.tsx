import { notFound } from "next/navigation"

import { ApiReference } from "@/components/api-reference"
import { ExampleRenderer } from "@/components/example-renderer"
import { InstallTabs } from "@/components/install-tabs"
import { StatusBadge } from "@/components/status-badge"
import { classify } from "@/lib/classify"
import { listRegistryItems, readItemSource, registryUrl } from "@/lib/code-extractor"
import { getExamples } from "@/lib/examples"

export function generateStaticParams() {
  return listRegistryItems("ui").map((name) => ({ slug: name }))
}

function titlecase(slug: string): string {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}

function pascalcase(slug: string): string {
  return titlecase(slug).replace(/\s+/g, "")
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const all = listRegistryItems("ui")
  if (!all.includes(slug)) notFound()

  const status = classify(slug)
  const examples = getExamples(slug)
  const source = readItemSource("ui", slug)
  const command = `npx shadcn@latest add ${registryUrl()}/r/${slug}.json`
  const title = titlecase(slug)
  const exportName = pascalcase(slug)

  return (
    <article className="space-y-12">
      <header className="space-y-3 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <StatusBadge status={status} />
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        {examples && examples.axes.length > 0 ? (
          <div className="mt-4">
            <ExampleRenderer axes={examples.axes} />
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No examples authored yet for this component.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
        <div className="mt-4">
          <InstallTabs command={command} source={source} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
        <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{`import { ${exportName} } from "@/registry/vitality/ui/${slug}"

export default function Example() {
  return <${exportName} />
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <div className="mt-4">
          <ApiReference slug={slug} />
        </div>
      </section>
    </article>
  )
}
