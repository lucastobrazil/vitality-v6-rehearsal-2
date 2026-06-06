import type { ComponentExamples } from "@/lib/examples/types"
import { StatusBadge } from "@/registry/vitality/ui/status-badge"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Severities",
      items: [
        { label: "Default", element: <StatusBadge>Default</StatusBadge> },
        { label: "Info", element: <StatusBadge severity="info">Info</StatusBadge> },
        { label: "Success", element: <StatusBadge severity="success">Success</StatusBadge> },
        { label: "Warning", element: <StatusBadge severity="warning">Warning</StatusBadge> },
        { label: "Critical", element: <StatusBadge severity="critical">Critical</StatusBadge> },
        { label: "Brand", element: <StatusBadge severity="brand">Brand</StatusBadge> },
      ],
    },
  ],
}

export default examples
