"use client"

import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/vitality/ui/input-group"
import { Label } from "@/registry/vitality/ui/label"
import { Switch } from "@/registry/vitality/ui/switch"

export function SidebarFilter({
  query,
  onQueryChange,
  vitalityOnly,
  onVitalityOnlyChange,
}: {
  query: string
  onQueryChange: (next: string) => void
  vitalityOnly: boolean
  onVitalityOnlyChange: (next: boolean) => void
}) {
  return (
    <div className="mt-1 mb-2 flex flex-col gap-2 px-2">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          autoFocus
          placeholder="Filter components…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Filter components"
        />
      </InputGroup>
      <Label className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>Vitality only</span>
        <Switch
          size="sm"
          checked={vitalityOnly}
          onCheckedChange={onVitalityOnlyChange}
          aria-label="Show only Vitality-touched components"
        />
      </Label>
    </div>
  )
}
