import classification from "@/public/_data/classification.json"

export type ClassificationStatus = "Customised" | "Net-new" | "Stock"

const map = classification as Record<string, ClassificationStatus>

export function classify(slug: string): ClassificationStatus {
  return map[slug] ?? "Stock"
}

export function listSlugs(): string[] {
  return Object.keys(map).sort()
}

export function listByStatus(status: ClassificationStatus): string[] {
  return Object.entries(map)
    .filter(([, s]) => s === status)
    .map(([slug]) => slug)
    .sort()
}

export function listVitalityTouched(): string[] {
  return Object.entries(map)
    .filter(([, s]) => s !== "Stock")
    .map(([slug]) => slug)
    .sort()
}
