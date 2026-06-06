#!/usr/bin/env node
/**
 * build-md-mirrors.mjs — emit per-page .md mirrors alongside the static HTML.
 *
 * Runs post-`next build`. For each page under `out/components/`, `out/blocks/`,
 * and `out/guides/`, emits a parallel `.md` file at the same URL + `.md`
 * suffix.
 *
 * Chunk 1 scope: minimal mirrors — title, status, install command, link
 * back to the HTML page. The richer content (Examples + API Reference)
 * lands in Chunk 2 once the underlying data sources exist.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const OUT_DIR = join(ROOT, "out")
const CLASSIFICATION_PATH = join(ROOT, "public", "_data", "classification.json")

const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL?.replace(/\/$/, "") || ""

function readJsonIfExists(path) {
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, "utf8"))
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

function listSlugSubdirs(parent) {
  if (!existsSync(parent)) return []
  return readdirSync(parent, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_") && !e.name.startsWith("["))
    .map((e) => e.name)
    .sort()
}

function buildComponentMd(slug, status) {
  const lines = []
  lines.push(`# ${titleCase(slug)}`)
  lines.push("")
  lines.push(`**Status:** ${status}`)
  lines.push("")
  lines.push(`A Vitality v6 ${status === "Net-new" ? "net-new component" : status === "Customised" ? "customised shadcn component" : "stock shadcn component (no Vitality customisations)"}.`)
  lines.push("")
  lines.push("## Installation")
  lines.push("")
  lines.push("```")
  lines.push(`npx shadcn@latest add ${abs(`/r/${slug}.json`)}`)
  lines.push("```")
  lines.push("")
  lines.push("## See also")
  lines.push("")
  lines.push(`- [Live preview & code examples](${abs(`/components/${slug}/`)})`)
  lines.push(`- [Registry JSON](${abs(`/r/${slug}.json`)})`)
  lines.push("")
  return lines.join("\n")
}

function buildBlockMd(slug) {
  const lines = []
  lines.push(`# ${titleCase(slug)}`)
  lines.push("")
  lines.push(`A Vitality v6 block (composed UI pattern using customised components).`)
  lines.push("")
  lines.push("## Installation")
  lines.push("")
  lines.push("```")
  lines.push(`npx shadcn@latest add ${abs(`/r/${slug}.json`)}`)
  lines.push("```")
  lines.push("")
  lines.push("## See also")
  lines.push("")
  lines.push(`- [Live preview & code](${abs(`/blocks/${slug}/`)})`)
  lines.push("")
  return lines.join("\n")
}

function buildGuideMd(slug) {
  const lines = []
  lines.push(`# ${titleCase(slug)}`)
  lines.push("")
  lines.push(`Vitality v6 ${titleCase(slug)} guide.`)
  lines.push("")
  lines.push(`See the [full guide](${abs(`/guides/${slug}/`)}).`)
  lines.push("")
  return lines.join("\n")
}

function main() {
  const classification = readJsonIfExists(CLASSIFICATION_PATH) ?? {}
  let written = 0

  // Components
  const componentsDir = join(OUT_DIR, "components")
  for (const slug of listSlugSubdirs(componentsDir)) {
    const status = classification[slug] ?? "Stock"
    const mdPath = join(OUT_DIR, "components", `${slug}.md`)
    writeFileSync(mdPath, buildComponentMd(slug, status), "utf8")
    written++
  }

  // Blocks
  const blocksDir = join(OUT_DIR, "blocks")
  for (const slug of listSlugSubdirs(blocksDir)) {
    const mdPath = join(OUT_DIR, "blocks", `${slug}.md`)
    writeFileSync(mdPath, buildBlockMd(slug), "utf8")
    written++
  }

  // Guides
  const guidesDir = join(OUT_DIR, "guides")
  for (const slug of listSlugSubdirs(guidesDir)) {
    const mdPath = join(OUT_DIR, "guides", `${slug}.md`)
    writeFileSync(mdPath, buildGuideMd(slug), "utf8")
    written++
  }

  console.log(`[build-md-mirrors] wrote ${written} .md mirror(s)`)
}

main()
