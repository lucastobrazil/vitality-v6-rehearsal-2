import type { ComponentExamples } from "@/lib/examples/types"
import { Calendar } from "@/registry/vitality/ui/calendar"

const TODAY = new Date(2026, 5, 6)

const examples: ComponentExamples = {
  axes: [
    {
      title: "Modes",
      items: [
        {
          label: "Single date",
          element: <Calendar mode="single" defaultMonth={TODAY} selected={TODAY} />,
        },
        {
          label: "Date range",
          element: (
            <Calendar
              mode="range"
              defaultMonth={TODAY}
              selected={{
                from: TODAY,
                to: new Date(2026, 5, 12),
              }}
            />
          ),
        },
      ],
    },
  ],
}

export default examples
