"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/vitality/ui/button"
import { Calendar } from "@/registry/vitality/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/vitality/ui/popover"

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  numberOfMonths?: number
  className?: string
  disabled?: boolean
}

function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  numberOfMonths = 2,
  className,
  disabled,
}: DateRangePickerProps) {
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >(undefined)
  const isControlled = value !== undefined || onChange !== undefined
  const range = isControlled ? value : internalRange

  const handleSelect = React.useCallback(
    (next: DateRange | undefined) => {
      if (!isControlled) setInternalRange(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-slot="date-range-picker-trigger"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !range && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, "LLL dd, y")} – {format(range.to, "LLL dd, y")}
              </>
            ) : (
              format(range.from, "LLL dd, y")
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={handleSelect}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
export type { DateRangePickerProps }
