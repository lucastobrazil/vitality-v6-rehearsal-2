import type { ComponentExamples } from "@/lib/examples/types"
import { Input } from "@/registry/vitality/ui/input"

const examples: ComponentExamples = {
  axes: [
    {
      title: "States",
      items: [
        { label: "Empty", element: <Input placeholder="you@example.com" /> },
        { label: "With value", element: <Input defaultValue="lucas@magentus.com" /> },
        { label: "Disabled", element: <Input disabled placeholder="Disabled" /> },
        {
          label: "Invalid",
          element: <Input aria-invalid placeholder="Triggers aria-invalid styling" />,
        },
      ],
    },
    {
      title: "Types",
      items: [
        { label: "Text", element: <Input type="text" placeholder="Text" /> },
        { label: "Email", element: <Input type="email" placeholder="Email" /> },
        { label: "Number", element: <Input type="number" placeholder="Number" /> },
      ],
    },
  ],
}

export default examples
