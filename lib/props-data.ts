import fs from "node:fs"
import path from "node:path"

export interface PropEntry {
  name: string
  type: string
  default: string | null
  required: boolean
  description: string | null
}

export interface ExportEntry {
  name: string
  description: string | null
  props: PropEntry[]
}

export interface PropsData {
  exports: ExportEntry[]
}

export function getProps(slug: string): PropsData | null {
  const file = path.join(process.cwd(), "public", "_data", "props", `${slug}.json`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, "utf8")) as PropsData
}
