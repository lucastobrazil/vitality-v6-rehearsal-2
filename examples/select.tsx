import type { ComponentExamples } from "@/lib/examples/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/vitality/ui/select"

function SizeExample({ size }: { size: "sm" | "default" }) {
  return (
    <Select>
      <SelectTrigger size={size} className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const examples: ComponentExamples = {
  axes: [
    {
      title: "Sizes",
      items: [
        { label: "Small", element: <SizeExample size="sm" /> },
        { label: "Default", element: <SizeExample size="default" /> },
      ],
    },
  ],
}

export default examples
