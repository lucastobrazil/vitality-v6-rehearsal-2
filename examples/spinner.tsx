import type { ComponentExamples } from "@/lib/examples/types"
import { Spinner } from "@/registry/vitality/ui/spinner"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Sizes",
      items: [
        { label: "sm", element: <Spinner size="sm" /> },
        { label: "default", element: <Spinner /> },
        { label: "lg", element: <Spinner size="lg" /> },
        { label: "xl", element: <Spinner size="xl" /> },
      ],
    },
    {
      title: "Colors",
      items: [
        { label: "Default", element: <Spinner /> },
        { label: "Primary", element: <Spinner color="primary" /> },
        { label: "Secondary", element: <Spinner color="secondary" /> },
      ],
    },
  ],
}

export default examples
