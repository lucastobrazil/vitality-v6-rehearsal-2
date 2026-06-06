import { X } from "lucide-react"

import type { ComponentExamples } from "@/lib/examples/types"
import { Chip } from "@/registry/vitality/ui/chip"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Default",
      items: [
        { label: "Plain", element: <Chip>Tag</Chip> },
        {
          label: "With remove",
          element: (
            <Chip>
              Tag
              <X data-icon="inline-end" />
            </Chip>
          ),
        },
        { label: "Long label", element: <Chip>Cardiology referral</Chip> },
      ],
    },
  ],
}

export default examples
