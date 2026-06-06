#!/usr/bin/env node
/**
 * extract-props.cjs — emit public/_data/props/<slug>.json for every component
 * under registry/vitality/ui via react-docgen-typescript. Runs as a pre-build
 * step (see package.json:scripts.build). Inherited HTML props (React.ComponentProps
 * et al.) are excluded; only Vitality-declared props survive the filter.
 */

'use strict'

const fs = require('node:fs')
const path = require('node:path')

const REPO_ROOT = process.cwd()
const UI_DIR = path.join(REPO_ROOT, 'registry', 'vitality', 'ui')
const OUT_DIR = path.join(REPO_ROOT, 'public', '_data', 'props')
const TSCONFIG = path.join(REPO_ROOT, 'tsconfig.json')

function fail(msg) {
  console.error(`[extract-props] FAILED: ${msg}`)
  process.exit(1)
}

if (!fs.existsSync(UI_DIR)) {
  console.log(`[extract-props] no ${path.relative(REPO_ROOT, UI_DIR)} — skipping`)
  process.exit(0)
}
if (!fs.existsSync(TSCONFIG)) fail(`tsconfig.json not found at ${TSCONFIG}`)

let docgen
try {
  docgen = require('react-docgen-typescript')
} catch (e) {
  fail(
    'react-docgen-typescript not installed. Run `npm install --save-dev react-docgen-typescript`.'
  )
}

const parser = docgen.withCustomConfig(TSCONFIG, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractValuesFromUnion: true,
  // Exclude props that originate from @types/react (HTML element passthrough).
  // Resolves PRD-004 OQ-A: API Reference only lists Vitality-declared props.
  propFilter: (prop) => {
    if (!prop.parent) return true
    return !prop.parent.fileName.includes('node_modules/@types/react')
  },
})

fs.mkdirSync(OUT_DIR, { recursive: true })

const files = fs.readdirSync(UI_DIR).filter((f) => f.endsWith('.tsx'))
const t0 = Date.now()
let totalExports = 0
let totalProps = 0
const failures = []

for (const file of files) {
  const slug = path.basename(file, '.tsx')
  const filePath = path.join(UI_DIR, file)
  let parsed
  try {
    parsed = parser.parse(filePath)
  } catch (e) {
    failures.push({ slug, error: e.message })
    continue
  }

  const exportsData = parsed.map((c) => {
    const props = Object.entries(c.props || {})
      .map(([name, p]) => ({
        name,
        type: p.type?.raw || p.type?.name || 'unknown',
        default: p.defaultValue?.value ?? null,
        required: Boolean(p.required),
        description: (p.description || '').trim() || null,
      }))
      // Stable ordering: required first, then alpha. Easier to scan in tables.
      .sort((a, b) => {
        if (a.required !== b.required) return a.required ? -1 : 1
        return a.name.localeCompare(b.name)
      })
    totalProps += props.length
    return {
      name: c.displayName,
      description: (c.description || '').trim() || null,
      props,
    }
  })

  totalExports += exportsData.length
  const dst = path.join(OUT_DIR, `${slug}.json`)
  fs.writeFileSync(dst, JSON.stringify({ exports: exportsData }, null, 2) + '\n', 'utf8')
}

if (failures.length > 0) {
  console.error(`[extract-props] ${failures.length} file(s) failed to parse:`)
  for (const f of failures) console.error(`  - ${f.slug}: ${f.error}`)
  process.exit(1)
}

const dt = ((Date.now() - t0) / 1000).toFixed(1)
console.log(
  `[extract-props] ok (${files.length} components, ${totalExports} exports, ${totalProps} props, ${dt}s)`
)
