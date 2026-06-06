import type { ComponentExamples } from "@/lib/examples/types"
import { Textarea } from "@/registry/vitality/ui/textarea"

const examples: ComponentExamples = {
  axes: [
    {
      title: "States",
      items: [
        { label: "Empty", element: <Textarea placeholder="Tell us more…" /> },
        {
          label: "With value",
          element: (
            <Textarea defaultValue="Patient reports intermittent chest pain since 2 weeks ago." />
          ),
        },
        { label: "Disabled", element: <Textarea disabled placeholder="Disabled" /> },
        {
          label: "Invalid",
          element: <Textarea aria-invalid placeholder="Triggers invalid styling" />,
        },
      ],
    },
  ],
}

export default examples
