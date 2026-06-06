import { Bold, Italic, Underline } from "lucide-react"

import type { ComponentExamples } from "@/lib/examples/types"
import { Toggle } from "@/registry/vitality/ui/toggle"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Variants",
      items: [
        {
          label: "Default",
          element: (
            <Toggle aria-label="Toggle bold">
              <Bold />
            </Toggle>
          ),
        },
        {
          label: "Outline",
          element: (
            <Toggle variant="outline" aria-label="Toggle italic">
              <Italic />
            </Toggle>
          ),
        },
      ],
    },
    {
      title: "Sizes",
      items: [
        {
          label: "sm",
          element: (
            <Toggle size="sm" aria-label="Underline">
              <Underline />
            </Toggle>
          ),
        },
        {
          label: "default",
          element: (
            <Toggle aria-label="Underline">
              <Underline />
            </Toggle>
          ),
        },
        {
          label: "lg",
          element: (
            <Toggle size="lg" aria-label="Underline">
              <Underline />
            </Toggle>
          ),
        },
      ],
    },
  ],
}

export default examples
