import { notFound } from "next/navigation"

import { listRegistryItems, readItemSource, registryUrl } from "@/lib/code-extractor"

export function generateStaticParams() {
  return listRegistryItems("ui").map((name) => ({ slug: name }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const all = listRegistryItems("ui")
  if (!all.includes(slug)) notFound()

  const source = readItemSource("ui", slug)
  const installUrl = `${registryUrl()}/r/${slug}.json`

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">{slug}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Component</p>
      </header>

      <section>
        <h2 className="text-base font-semibold">Install</h2>
        <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{`npx shadcn@latest add ${installUrl}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-base font-semibold">Source</h2>
        <pre className="mt-2 max-h-[60vh] overflow-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{source}</code>
        </pre>
      </section>
    </article>
  )
}
