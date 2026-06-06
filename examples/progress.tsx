import type { ComponentExamples } from "@/lib/examples/types"
import { Progress } from "@/registry/vitality/ui/progress"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Values",
      items: [
        {
          label: "0%",
          element: <Progress value={0} className="w-full" />,
        },
        {
          label: "33%",
          element: <Progress value={33} className="w-full" />,
        },
        {
          label: "67%",
          element: <Progress value={67} className="w-full" />,
        },
        {
          label: "100%",
          element: <Progress value={100} className="w-full" />,
        },
      ],
    },
  ],
}

export default examples
