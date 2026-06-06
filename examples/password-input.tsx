import type { ComponentExamples } from "@/lib/examples/types"
import { PasswordInput } from "@/registry/vitality/ui/password-input"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Default",
      items: [
        { label: "Empty", element: <PasswordInput placeholder="Enter password" /> },
        { label: "With value", element: <PasswordInput defaultValue="hunter2" /> },
        { label: "Disabled", element: <PasswordInput disabled placeholder="Disabled" /> },
      ],
    },
  ],
}

export default examples
