import type { ComponentExamples } from "@/lib/examples/types"
import { DateRangePicker } from "@/registry/vitality/ui/date-range-picker"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Default",
      items: [
        { label: "Empty", element: <DateRangePicker /> },
        { label: "Disabled", element: <DateRangePicker disabled /> },
      ],
    },
  ],
}

export default examples
