import type { ExampleAxis } from "@/lib/examples/types"

export function ExampleRenderer({ axes }: { axes: ExampleAxis[] }) {
  return (
    <div className="space-y-10">
      {axes.map((axis) => (
        <section key={axis.title}>
          <h3 className="text-base font-semibold tracking-tight">{axis.title}</h3>
          {axis.description ? (
            <p className="mt-1 text-sm text-muted-foreground">{axis.description}</p>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {axis.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
              >
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <div className="flex flex-1 items-center justify-center py-2">
                  {item.element}
                </div>
                {item.code ? (
                  <pre className="mt-1 overflow-x-auto rounded bg-muted/40 p-2 text-[11px]">
                    <code>{item.code}</code>
                  </pre>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
