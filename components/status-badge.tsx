import { cn } from "@/lib/utils"
import type { ClassificationStatus } from "@/lib/classify"

const STYLES: Record<ClassificationStatus, string> = {
  Customised: "bg-info/10 text-info border-info/20",
  "Net-new": "bg-success/10 text-success border-success/20",
  Stock: "bg-muted text-muted-foreground border-border",
}

export function StatusBadge({
  status,
  className,
}: {
  status: ClassificationStatus
  className?: string
}) {
  return (
    <span
      data-slot="docs-status-badge"
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        STYLES[status],
        className
      )}
    >
      {status}
    </span>
  )
}
