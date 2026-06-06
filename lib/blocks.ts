import blocksJson from "@/public/_data/blocks.json"

const blocks = blocksJson as string[]

export function listBlocks(): string[] {
  return [...blocks].sort()
}
