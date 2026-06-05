import fs from "fs"
import path from "path"

// Demo-site helpers — used by static pages to read the live registry tree.
// All file IO happens at build time (Next.js static export).

const ROOT = process.cwd()
const REGISTRY_ROOT = path.join(ROOT, "registry", "vitality")

type Bucket = "ui" | "blocks"

export function listRegistryItems(bucket: Bucket): string[] {
  const dir = path.join(REGISTRY_ROOT, bucket)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""))
    .sort()
}

export function readItemSource(bucket: Bucket, name: string): string {
  const file = path.join(REGISTRY_ROOT, bucket, `${name}.tsx`)
  if (!fs.existsSync(file)) return `// source not found: ${file}`
  return fs.readFileSync(file, "utf8")
}

export function registryUrl(): string {
  // Set by GH Actions deploy step via env var; falls back to localhost for dev.
  return process.env.NEXT_PUBLIC_REGISTRY_URL || "http://localhost:3000"
}

export function mcpConfigSnippet(base: string): string {
  // Speculative — uses the shadcn-mcp-server pattern. Adjust to whichever MCP
  // server your AI tool actually consumes.
  return JSON.stringify(
    {
      mcpServers: {
        "vitality-v6": {
          command: "npx",
          args: ["-y", "@shadcn/mcp-server", base],
        },
      },
    },
    null,
    2
  )
}
