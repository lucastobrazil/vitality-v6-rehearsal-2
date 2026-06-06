import type { ComponentExamples } from "@/lib/examples/types"
import { Label } from "@/registry/vitality/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/vitality/ui/radio-group"

function VerticalGroup() {
  return (
    <RadioGroup defaultValue="comfortable" className="flex flex-col gap-2">
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="default" />
        <span>Default</span>
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" />
        <span>Comfortable</span>
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="compact" />
        <span>Compact</span>
      </Label>
    </RadioGroup>
  )
}

function HorizontalGroup() {
  return (
    <RadioGroup defaultValue="b" orientation="horizontal" className="flex gap-4">
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="a" />
        <span>A</span>
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="b" />
        <span>B</span>
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="c" />
        <span>C</span>
      </Label>
    </RadioGroup>
  )
}

const examples: ComponentExamples = {
  axes: [
    {
      title: "Orientations",
      items: [
        { label: "Vertical", element: <VerticalGroup /> },
        { label: "Horizontal", element: <HorizontalGroup /> },
      ],
    },
  ],
}

export default examples
