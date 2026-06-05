import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Single-style chip (no variants) — copy of Badge shape with left-border accent.
// asChild allows rendering as <a> or other element via Slot pattern.
interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

function Chip({ className, asChild = false, ...props }: ChipProps) {
  const Comp = asChild ? Slot.Root : "span"
  return (
    <Comp
      data-slot="chip"
      className={cn(
        "inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0",
        "px-1.5 h-5 min-w-5 text-xs font-medium rounded-full",
        "[&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
        "bg-foreground/10 text-foreground border-[1px] border-l-[3px]",
        "border-gray-300 [a&]:hover:bg-foreground/15",
        className
      )}
      {...props}
    />
  )
}

export { Chip }
