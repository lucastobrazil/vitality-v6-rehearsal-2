import type { ComponentExamples } from "@/lib/examples/types"
import { Checkbox } from "@/registry/vitality/ui/checkbox"
import { Label } from "@/registry/vitality/ui/label"

const examples: ComponentExamples = {
  axes: [
    {
      title: "States",
      items: [
        {
          label: "Unchecked",
          element: (
            <Label className="flex items-center gap-2">
              <Checkbox />
              <span>Accept terms</span>
            </Label>
          ),
        },
        {
          label: "Checked",
          element: (
            <Label className="flex items-center gap-2">
              <Checkbox defaultChecked />
              <span>Accept terms</span>
            </Label>
          ),
        },
        {
          label: "Disabled",
          element: (
            <Label className="flex items-center gap-2">
              <Checkbox disabled />
              <span>Accept terms</span>
            </Label>
          ),
        },
        {
          label: "Disabled checked",
          element: (
            <Label className="flex items-center gap-2">
              <Checkbox disabled defaultChecked />
              <span>Accept terms</span>
            </Label>
          ),
        },
      ],
    },
  ],
}

export default examples
