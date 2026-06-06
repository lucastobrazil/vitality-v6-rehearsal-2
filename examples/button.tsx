import { Mail, Plus, Trash2 } from "lucide-react"

import type { ComponentExamples } from "@/lib/examples/types"
import { Button } from "@/registry/vitality/ui/button"
import { Spinner } from "@/registry/vitality/ui/spinner"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Variants",
      items: [
        { label: "Default", element: <Button>Default</Button> },
        { label: "Primary", element: <Button variant="primary">Primary</Button> },
        { label: "Outline", element: <Button variant="outline">Outline</Button> },
        { label: "Ghost", element: <Button variant="ghost">Ghost</Button> },
        { label: "Destructive", element: <Button variant="destructive">Destructive</Button> },
        { label: "Link", element: <Button variant="link">Link</Button> },
      ],
    },
    {
      title: "Sizes",
      items: [
        { label: "xs", element: <Button size="xs">Extra small</Button> },
        { label: "sm", element: <Button size="sm">Small</Button> },
        { label: "default", element: <Button>Default</Button> },
        { label: "lg", element: <Button size="lg">Large</Button> },
      ],
    },
    {
      title: "Icon-only",
      items: [
        { label: "icon-xs", element: <Button size="icon-xs" aria-label="Add"><Plus /></Button> },
        { label: "icon-sm", element: <Button size="icon-sm" aria-label="Add"><Plus /></Button> },
        { label: "icon", element: <Button size="icon" aria-label="Add"><Plus /></Button> },
        { label: "icon-lg", element: <Button size="icon-lg" aria-label="Add"><Plus /></Button> },
      ],
    },
    {
      title: "With icons",
      items: [
        {
          label: "Leading",
          element: (
            <Button>
              <Mail data-icon="inline-start" />
              Send email
            </Button>
          ),
        },
        {
          label: "Trailing",
          element: (
            <Button variant="primary">
              Continue
              <Plus data-icon="inline-end" />
            </Button>
          ),
        },
        {
          label: "Destructive + leading",
          element: (
            <Button variant="destructive">
              <Trash2 data-icon="inline-start" />
              Delete
            </Button>
          ),
        },
      ],
    },
    {
      title: "Loading",
      items: [
        {
          label: "Loading default",
          element: (
            <Button disabled>
              <Spinner />
              Loading
            </Button>
          ),
        },
        {
          label: "Loading primary",
          element: (
            <Button variant="primary" disabled>
              <Spinner />
              Saving…
            </Button>
          ),
        },
      ],
    },
    {
      title: "Disabled",
      items: [
        { label: "Default", element: <Button disabled>Default</Button> },
        { label: "Primary", element: <Button variant="primary" disabled>Primary</Button> },
        { label: "Destructive", element: <Button variant="destructive" disabled>Destructive</Button> },
      ],
    },
  ],
}

export default examples
