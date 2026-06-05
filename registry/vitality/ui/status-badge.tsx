import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  [
    "inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0",
    "px-2 py-0.5 text-xs font-medium border border-transparent rounded-md",
    "[&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
  ].join(" "),
  {
    variants: {
      color: {
        default: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        neutral: "bg-foreground/70 text-muted [a&]:hover:bg-foreground/90",
      },
      severity: {
        default: "text-foreground bg-muted",
        success: "text-success bg-success/10 [&>svg]:text-success",
        warning: "text-warning bg-warning/10 [&>svg]:text-warning",
        critical: "text-critical bg-critical/10 [&>svg]:text-critical",
        info: "text-info bg-info/10 [&>svg]:text-info",
        brand: "text-brand bg-brand/10 [&>svg]:text-brand",
      },
    },
    defaultVariants: {
      color: "default",
      severity: "default",
    },
  }
)

interface StatusBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof statusBadgeVariants> {
  asChild?: boolean
}

function StatusBadge({
  className,
  color,
  severity,
  asChild = false,
  ...props
}: StatusBadgeProps) {
  const Comp = asChild ? Slot.Root : "span"
  return (
    <Comp
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ color, severity }), className)}
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }
