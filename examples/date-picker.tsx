import type { ComponentExamples } from "@/lib/examples/types"
import { DatePicker } from "@/registry/vitality/ui/date-picker"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Default",
      items: [
        { label: "Empty", element: <DatePicker /> },
        { label: "Disabled", element: <DatePicker disabled /> },
      ],
    },
  ],
}

export default examples
