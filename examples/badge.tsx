import type { ComponentExamples } from "@/lib/examples/types"
import { Badge } from "@/registry/vitality/ui/badge"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Variants",
      items: [
        { label: "Default", element: <Badge>Default</Badge> },
        { label: "Primary", element: <Badge variant="primary">Primary</Badge> },
        { label: "Secondary", element: <Badge variant="secondary">Secondary</Badge> },
        { label: "Outline", element: <Badge variant="outline">Outline</Badge> },
        { label: "Destructive", element: <Badge variant="destructive">Destructive</Badge> },
        { label: "Ghost", element: <Badge variant="ghost">Ghost</Badge> },
        { label: "Success", element: <Badge variant="success">Success</Badge> },
        { label: "Warning", element: <Badge variant="warning">Warning</Badge> },
        { label: "Info", element: <Badge variant="info">Info</Badge> },
        { label: "Brand", element: <Badge variant="brand">Brand</Badge> },
      ],
    },
  ],
}

export default examples
