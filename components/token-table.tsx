import tokensJson from "@/public/_data/tokens.json"

interface TokenEntry {
  name: string
  light: string
  dark: string | null
  category: "color" | "radius" | "font" | "other"
}

const ALL = tokensJson as TokenEntry[]

export function TokenTable({
  category,
  title,
  description,
}: {
  category: TokenEntry["category"]
  title: string
  description?: string
}) {
  const rows = ALL.filter((t) => t.category === category)
  if (rows.length === 0) return null

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Token</th>
              <th className="px-3 py-2 font-medium">Light</th>
              {category === "color" ? (
                <th className="px-3 py-2 font-medium">Dark</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.name} className="border-t border-border align-middle">
                <td className="px-3 py-2 font-mono text-xs">{t.name}</td>
                <td className="px-3 py-2">
                  <ValueCell category={category} value={t.light} mode="light" name={t.name} />
                </td>
                {category === "color" ? (
                  <td className="px-3 py-2">
                    <ValueCell
                      category={category}
                      value={t.dark}
                      mode="dark"
                      name={t.name}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ValueCell({
  category,
  value,
  mode,
  name,
}: {
  category: TokenEntry["category"]
  value: string | null
  mode: "light" | "dark"
  name: string
}) {
  if (!value) {
    return <span className="text-xs text-muted-foreground">—</span>
  }
  if (category !== "color") {
    return <code className="font-mono text-xs">{value}</code>
  }
  const cssVarRef = `var(${name})`
  const wrapperClass = mode === "dark" ? "dark" : ""
  return (
    <div className={wrapperClass}>
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-block h-5 w-5 shrink-0 rounded border border-border"
          style={{ backgroundColor: cssVarRef }}
        />
        <code className="font-mono text-[11px] text-muted-foreground">{value}</code>
      </div>
    </div>
  )
}
