import { getProps } from "@/lib/props-data"

export function ApiReference({ slug }: { slug: string }) {
  const data = getProps(slug)

  if (!data || data.exports.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No prop documentation extracted for this component.
      </p>
    )
  }

  return (
    <div className="space-y-10">
      {data.exports.map((exp) => (
        <section key={exp.name}>
          <h3 className="text-base font-semibold tracking-tight">{exp.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {exp.description ?? `The ${exp.name} component.`}
          </p>

          {exp.props.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-md border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Prop</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody>
                  {exp.props.map((p) => (
                    <tr key={p.name} className="border-t border-border align-top">
                      <td className="px-3 py-2 font-mono text-xs">
                        {p.name}
                        {p.required ? (
                          <span className="ml-0.5 text-destructive" aria-label="required">
                            *
                          </span>
                        ) : null}
                        {p.description ? (
                          <span className="mt-1 block font-sans text-xs text-muted-foreground">
                            {p.description}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-2">
                        <code className="block whitespace-pre-wrap break-words rounded bg-muted/40 px-1.5 py-0.5 font-mono text-xs">
                          {p.type}
                        </code>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                        {p.default ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No declared props beyond inherited HTML attributes.
            </p>
          )}
        </section>
      ))}
    </div>
  )
}
