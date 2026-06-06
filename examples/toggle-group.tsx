import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react"

import type { ComponentExamples } from "@/lib/examples/types"
import { ToggleGroup, ToggleGroupItem } from "@/registry/vitality/ui/toggle-group"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Types",
      items: [
        {
          label: "Single",
          element: (
            <ToggleGroup type="single" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight />
              </ToggleGroupItem>
            </ToggleGroup>
          ),
        },
        {
          label: "Multiple",
          element: (
            <ToggleGroup type="multiple" defaultValue={["bold"]}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline />
              </ToggleGroupItem>
            </ToggleGroup>
          ),
        },
      ],
    },
  ],
}

export default examples
