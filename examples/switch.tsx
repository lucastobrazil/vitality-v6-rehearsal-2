import type { ComponentExamples } from "@/lib/examples/types"
import { Label } from "@/registry/vitality/ui/label"
import { Switch } from "@/registry/vitality/ui/switch"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Sizes",
      items: [
        {
          label: "Small",
          element: (
            <Label className="flex items-center gap-2">
              <Switch size="sm" />
              <span>Notifications</span>
            </Label>
          ),
        },
        {
          label: "Default",
          element: (
            <Label className="flex items-center gap-2">
              <Switch />
              <span>Notifications</span>
            </Label>
          ),
        },
      ],
    },
    {
      title: "States",
      items: [
        {
          label: "Off",
          element: (
            <Label className="flex items-center gap-2">
              <Switch />
              <span>Push enabled</span>
            </Label>
          ),
        },
        {
          label: "On",
          element: (
            <Label className="flex items-center gap-2">
              <Switch defaultChecked />
              <span>Push enabled</span>
            </Label>
          ),
        },
        {
          label: "Disabled",
          element: (
            <Label className="flex items-center gap-2">
              <Switch disabled />
              <span>Push enabled</span>
            </Label>
          ),
        },
      ],
    },
  ],
}

export default examples
