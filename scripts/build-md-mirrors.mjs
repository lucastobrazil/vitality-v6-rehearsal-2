#!/usr/bin/env node
/**
 * build-md-mirrors.mjs — emit per-page .md mirrors alongside the static HTML.
 *
 * Runs post-`next build`. For each page under `out/components/`, `out/blocks/`,
 * and `out/guides/`, emits a parallel `.md` file in the same directory tree.
 *
 * Per PRD-004 Story 5 AC3: each component mirror contains title, status,
 * description, Examples narrative (TSX source from examples/<slug>.tsx),
 * Installation command, Usage code, and API Reference tables in Markdown
 * (from public/_data/props/<slug>.json).
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const OUT_DIR = join(ROOT, "out")
const CLASSIFICATION_PATH = join(ROOT, "public", "_data", "classification.json")
const PROPS_DIR = join(ROOT, "public", "_data", "props")
const EXAMPLES_DIR = join(ROOT, "examples")
const UI_DIR = join(ROOT, "registry", "vitality", "ui")
const BLOCKS_SRC_DIR = join(ROOT, "registry", "vitality", "blocks")

const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL?.replace(/\/$/, "") || ""

function readJsonIfExists(path) {
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, "utf8"))
}

function readFileIfExists(path) {
  if (!existsSync(path)) return null
  return readFileSync(path, "utf8")
}

function titleCase(slug) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

function pascalCase(slug) {
  return titleCase(slug).replace(/\s+/g, "")
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

// Render a Markdown table for one export's prop list. Escapes `|` chars inside
// type strings so the table doesn't break.
function renderPropTable(props) {
  if (!props || props.length === 0) {
    return "_No declared props beyond inherited HTML attributes._"
  }
  const lines = []
  lines.push("| Prop | Type | Default |")
  lines.push("| --- | --- | --- |")
  for (const p of props) {
    const propName = p.required ? `**${p.name}** (required)` : p.name
    const typeStr = "`" + String(p.type).replace(/\|/g, "\\|") + "`"
    const defaultStr = p.default ? "`" + p.default + "`" : "—"
    lines.push(`| ${propName} | ${typeStr} | ${defaultStr} |`)
  }
  return lines.join("\n")
}

function buildComponentMd(slug, status) {
  const props = readJsonIfExists(join(PROPS_DIR, `${slug}.json`))
  const exampleSource = readFileIfExists(join(EXAMPLES_DIR, `${slug}.tsx`))
  const componentName = pascalCase(slug)
  const statusBlurb =
    status === "Net-new"
      ? "Vitality-authored component without a stock shadcn equivalent."
      : status === "Customised"
      ? "Vitality customisation of shadcn's stock component."
      : "Stock shadcn component installed alongside the Vitality set."

  const lines = []
  lines.push(`# ${titleCase(slug)}`)
  lines.push("")
  lines.push(`**Status:** ${status}`)
  lines.push("")
  lines.push(`The ${componentName} component. ${statusBlurb}`)
  lines.push("")

  // Examples — inline the TSX source as the canonical narrative + code.
  if (exampleSource) {
    lines.push("## Examples")
    lines.push("")
    lines.push(
      "Per-component example axes (Variants / Sizes / States / etc.) authored as a TSX module. " +
        "Each `axis.title` is a documentation grouping; each `item.label` names a single variant " +
        "and the `element:` JSX shows the live usage."
    )
    lines.push("")
    lines.push("```tsx")
    lines.push(exampleSource.trimEnd())
    lines.push("```")
    lines.push("")
  } else {
    lines.push("## Examples")
    lines.push("")
    lines.push("_No examples authored yet for this component._")
    lines.push("")
  }

  // Installation
  lines.push("## Installation")
  lines.push("")
  lines.push("```")
  lines.push(`npx shadcn@latest add ${abs(`/r/${slug}.json`)}`)
  lines.push("```")
  lines.push("")

  // Usage
  lines.push("## Usage")
  lines.push("")
  lines.push("```tsx")
  lines.push(`import { ${componentName} } from "@/registry/vitality/ui/${slug}"`)
  lines.push("")
  lines.push(`export default function Example() {`)
  lines.push(`  return <${componentName} />`)
  lines.push("}")
  lines.push("```")
  lines.push("")

  // API Reference
  lines.push("## API Reference")
  lines.push("")
  if (props && props.exports && props.exports.length > 0) {
    for (const exp of props.exports) {
      lines.push(`### ${exp.name}`)
      lines.push("")
      lines.push(exp.description ?? `The ${exp.name} component.`)
      lines.push("")
      lines.push(renderPropTable(exp.props))
      lines.push("")
    }
  } else {
    lines.push("_No prop documentation extracted for this component._")
    lines.push("")
  }

  // Cross-links
  lines.push("---")
  lines.push("")
  lines.push(`- [Live preview](${abs(`/components/${slug}/`)})`)
  lines.push(`- [Registry JSON](${abs(`/r/${slug}.json`)})`)
  lines.push("")
  return lines.join("\n")
}

function buildBlockMd(slug) {
  const source = readFileIfExists(join(BLOCKS_SRC_DIR, `${slug}.tsx`))
  const lines = []
  lines.push(`# ${titleCase(slug)}`)
  lines.push("")
  lines.push(`A Vitality v6 block — a composed UI pattern using customised components.`)
  lines.push("")
  lines.push("## Installation")
  lines.push("")
  lines.push("```")
  lines.push(`npx shadcn@latest add ${abs(`/r/${slug}.json`)}`)
  lines.push("```")
  lines.push("")
  if (source) {
    lines.push("## Source")
    lines.push("")
    lines.push("```tsx")
    lines.push(source.trimEnd())
    lines.push("```")
    lines.push("")
  }
  lines.push("---")
  lines.push("")
  lines.push(`- [Live preview](${abs(`/blocks/${slug}/`)})`)
  lines.push("")
  return lines.join("\n")
}

function buildGuideMd(slug) {
  const title = titleCase(slug)
  const blurb =
    slug === "getting-started"
      ? "Install components individually via the shadcn CLI — no package install, no lock-step versioning."
      : slug === "installation"
      ? "Prereqs + initial setup commands for adding the Vitality registry to a fresh Next.js + Tailwind v4 project."
      : slug === "design-tokens"
      ? "Every Vitality CSS token (palette + radius scale + critical/severity), extracted from globals.css at build time. Light + dark OKLCH values side-by-side."
      : `Vitality v6 ${title} guide.`

  const lines = []
  lines.push(`# ${title}`)
  lines.push("")
  lines.push(blurb)
  lines.push("")
  lines.push(`See the [full guide](${abs(`/guides/${slug}/`)}) for the rendered version with live examples.`)
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

  console.log(`[build-md-mirrors] wrote ${written} .md mirror(s) with full body`)
}

main()
