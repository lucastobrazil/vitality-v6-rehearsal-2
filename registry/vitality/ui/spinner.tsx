import * as React from "react"
import { Loader2Icon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-6",
      lg: "size-8",
      xl: "size-12",
    },
    color: {
      default: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
  },
})

export interface SpinnerProps
  extends Omit<React.SVGProps<SVGSVGElement>, "color">,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, color, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      data-slot="spinner"
      strokeLinecap="round"
      className={cn(spinnerVariants({ size, color }), className)}
      {...props}
    />
  )
}

export { Spinner, spinnerVariants }
