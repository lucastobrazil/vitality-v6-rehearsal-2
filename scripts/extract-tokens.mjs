#!/usr/bin/env node
/**
 * extract-tokens.mjs — parse app/globals.css for Vitality design tokens and
 * emit public/_data/tokens.json. Runs as a pre-build step (chained into
 * package.json:scripts.build). Categorises by name pattern:
 *   --font-*      → font
 *   --radius*     → radius
 *   --color-*     → skipped (Tailwind v4 @theme inline aliases — duplicate)
 *   anything else → color (most :root tokens are OKLCH colours)
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const GLOBALS = path.join(ROOT, 'app', 'globals.css')
const OUT = path.join(ROOT, 'public', '_data', 'tokens.json')

if (!fs.existsSync(GLOBALS)) {
  console.error(`[extract-tokens] ${GLOBALS} not found — skipping`)
  process.exit(0)
}

const css = fs.readFileSync(GLOBALS, 'utf8')

function parseBlock(blockRegex) {
  const m = css.match(blockRegex)
  if (!m) return {}
  const body = m[1]
  const tokens = {}
  const lineRe = /--([\w-]+):\s*([^;]+);/g
  let match
  while ((match = lineRe.exec(body)) !== null) {
    tokens[match[1]] = match[2].trim()
  }
  return tokens
}

const rootTokens = parseBlock(/:root\s*\{([\s\S]*?)\n\}/)
const darkTokens = parseBlock(/\.dark\s*\{([\s\S]*?)\n\}/)
const themeTokens = parseBlock(/@theme\s+inline\s*\{([\s\S]*?)\n\}/)

function categorise(name) {
  if (name.startsWith('font-')) return 'font'
  if (name === 'radius' || name.startsWith('radius-')) return 'radius'
  return 'color'
}

const entries = []

// Color tokens from :root (light) merged with .dark (dark variants).
for (const name of Object.keys(rootTokens).sort()) {
  if (name === 'radius') continue
  entries.push({
    name: `--${name}`,
    light: rootTokens[name],
    dark: darkTokens[name] ?? null,
    category: categorise(name),
  })
}

// Radius scale + fonts from @theme inline (no light/dark variation).
// Skip --color-* aliases (they just re-point at :root/.dark vars).
for (const name of Object.keys(themeTokens).sort()) {
  if (name.startsWith('color-')) continue
  const category = categorise(name)
  if (category === 'color') continue // theme block colour aliases handled by :root
  entries.push({
    name: `--${name}`,
    light: themeTokens[name],
    dark: null,
    category,
  })
}

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(entries, null, 2) + '\n', 'utf8')

const counts = entries.reduce((acc, e) => {
  acc[e.category] = (acc[e.category] || 0) + 1
  return acc
}, {})
const summary = Object.entries(counts)
  .map(([k, v]) => `${v} ${k}`)
  .join(' · ')
console.log(`[extract-tokens] ok (${entries.length} tokens: ${summary})`)
