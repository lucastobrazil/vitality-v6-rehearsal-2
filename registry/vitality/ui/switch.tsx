"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

function Switch({
  className,
  checked,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      checked={checked}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-all outline-none px-0.75",
        "data-[size=default]:h-[1.25rem] data-[size=default]:w-9",
        "data-[size=sm]:h-[14px] data-[size=sm]:w-[24px]",
        "data-unchecked:bg-foreground/50 dark:data-unchecked:bg-foreground/30",
        "data-checked:bg-primary",
        "data-checked:justify-start data-unchecked:justify-end",
        "[&_svg:not([class*='size-'])]:size-3",
        "[&_svg:not([class*='text-'])]:text-primary-foreground",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0",
          "group-data-[size=default]/switch:size-4",
          "group-data-[size=sm]/switch:size-3",
          "group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)]",
          "group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]",
          "data-unchecked:translate-x-0",
          "absolute left-[1px]",
          "transition-transform"
        )}
      />
      {checked ? <Check /> : <X />}
    </SwitchPrimitive.Root>
  )
}

export { Switch }
