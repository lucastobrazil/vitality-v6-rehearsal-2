#!/usr/bin/env node
/**
 * build-llms-txt.mjs — emit /llms.txt at site root.
 *
 * Runs post-`next build`. Reads `public/_data/classification.json` (emitted by
 * the scaffold-vitality-05-demo-mcp build step) to enumerate components + their
 * status; reads `public/_data/blocks.json` for the blocks list; reads
 * `app/guides/` for guide pages.
 *
 * Output: `out/llms.txt`. Format per llms.txt spec (llmstxt.org) — H1 + summary
 * + H2 sections with curated link lists.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs"
import { join, basename } from "node:path"

const ROOT = process.cwd()
const OUT_DIR = join(ROOT, "out")
const CLASSIFICATION_PATH = join(ROOT, "public", "_data", "classification.json")
const BLOCKS_PATH = join(ROOT, "public", "_data", "blocks.json")
const GUIDES_DIR = join(ROOT, "app", "guides")

const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL?.replace(/\/$/, "") || ""

function readJsonIfExists(path) {
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, "utf8"))
}

function listGuides() {
  if (!existsSync(GUIDES_DIR)) return []
  return readdirSync(GUIDES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()
}

function titleCase(slug) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

function abs(path) {
  return REGISTRY_URL ? `${REGISTRY_URL}${path}` : path
}

function main() {
  const classification = readJsonIfExists(CLASSIFICATION_PATH) ?? {}
  const blocks = readJsonIfExists(BLOCKS_PATH) ?? []
  const guides = listGuides()

  const components = Object.keys(classification).sort()
  const customised = components.filter((s) => classification[s] === "Customised")
  const netnew = components.filter((s) => classification[s] === "Net-new")
  const stock = components.filter((s) => classification[s] === "Stock")

  const lines = []
  lines.push("# Vitality v6")
  lines.push("")
  lines.push("> A shadcn-based component registry, customised for Magentus product UIs. Radix primitives, OKLCH palette, tightened defaults for dense product surfaces.")
  lines.push("")
  lines.push("Install any component into a shadcn-compatible Next.js app with:")
  lines.push("```")
  lines.push(`npx shadcn@latest add ${abs("/r/<name>.json")}`)
  lines.push("```")
  lines.push("")

  // Guides
  if (guides.length > 0) {
    lines.push("## Guides")
    lines.push("")
    for (const g of guides) {
      lines.push(`- [${titleCase(g)}](${abs(`/guides/${g}/`)}): Vitality v6 ${titleCase(g)} guide.`)
    }
    lines.push("")
  }

  // Blocks
  if (blocks.length > 0) {
    lines.push("## Blocks")
    lines.push("")
    for (const b of blocks) {
      lines.push(`- [${titleCase(b)}](${abs(`/blocks/${b}/`)}): Vitality block: ${titleCase(b)}.`)
    }
    lines.push("")
  }

  // Components — split by status
  if (customised.length > 0) {
    lines.push("## Components (Customised)")
    lines.push("")
    lines.push("Stock shadcn components with Vitality-specific overrides (variant renames, sizing, palette).")
    lines.push("")
    for (const c of customised) {
      lines.push(`- [${titleCase(c)}](${abs(`/components/${c}.md`)}): Vitality customisation of shadcn's ${c}.`)
    }
    lines.push("")
  }

  if (netnew.length > 0) {
    lines.push("## Components (Net-new)")
    lines.push("")
    lines.push("Vitality-authored components without a stock shadcn equivalent.")
    lines.push("")
    for (const c of netnew) {
      lines.push(`- [${titleCase(c)}](${abs(`/components/${c}.md`)}): Vitality ${titleCase(c)} component.`)
    }
    lines.push("")
  }

  if (stock.length > 0) {
    lines.push("## Components (Stock)")
    lines.push("")
    lines.push("Stock shadcn components installed alongside the customised set (transitive deps + utilities).")
    lines.push("")
    for (const c of stock) {
      lines.push(`- [${titleCase(c)}](${abs(`/components/${c}.md`)}): Stock shadcn ${c}.`)
    }
    lines.push("")
  }

  const outPath = join(OUT_DIR, "llms.txt")
  writeFileSync(outPath, lines.join("\n"), "utf8")
  console.log(`[build-llms-txt] wrote ${outPath} (${lines.length} lines, ${components.length} components)`)
}

main()
