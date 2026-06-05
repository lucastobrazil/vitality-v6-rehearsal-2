import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative w-full text-left has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      severity: {
        default: "text-foreground bg-muted [&>svg]:text-foreground",
        success: "text-success bg-success/10 [&>svg]:text-success",
        warning: "text-warning bg-warning/10 [&>svg]:text-warning",
        critical: "text-critical bg-critical/10 [&>svg]:text-critical",
        info: "text-info bg-info/10 [&>svg]:text-info",
        brand: "text-brand bg-brand/10 [&>svg]:text-brand",
      },
      size: {
        default:
          "grid gap-0.5 rounded-md px-4 py-3 text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr]",
        compact:
          "flex items-center gap-1 px-0 py-0 bg-transparent! text-xs [&>svg]:translate-y-0 [&>svg]:shrink-0",
        blockCompact:
          "flex! gap-x-1! rounded-md px-3 py-2 text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18",
      },
    },
    defaultVariants: {
      severity: "default",
      size: "default",
    },
  }
)

function Alert({
  className,
  severity = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-severity={severity}
      data-size={size}
      role="alert"
      className={cn(alertVariants({ severity, size }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4 group-data-[size=blockCompact]/alert:[&]:inline group-data-[size=compact]/alert:[&]:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
