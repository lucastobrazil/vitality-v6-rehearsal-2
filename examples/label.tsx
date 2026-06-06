import type { ComponentExamples } from "@/lib/examples/types"
import { Input } from "@/registry/vitality/ui/input"
import { Label } from "@/registry/vitality/ui/label"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Default",
      items: [
        {
          label: "With input",
          element: (
            <div className="flex flex-col gap-2">
              <Label htmlFor="example-input">Email</Label>
              <Input id="example-input" type="email" placeholder="you@example.com" />
            </div>
          ),
        },
      ],
    },
  ],
}

export default examples
