import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

import type { ComponentExamples } from "@/lib/examples/types"
import { Alert, AlertDescription, AlertTitle } from "@/registry/vitality/ui/alert"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Severities",
      items: [
        {
          label: "Default",
          element: (
            <Alert>
              <Info />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>A neutral message for the user.</AlertDescription>
            </Alert>
          ),
        },
        {
          label: "Info",
          element: (
            <Alert severity="info">
              <Info />
              <AlertTitle>Did you know?</AlertTitle>
              <AlertDescription>Informational content goes here.</AlertDescription>
            </Alert>
          ),
        },
        {
          label: "Success",
          element: (
            <Alert severity="success">
              <CircleCheck />
              <AlertTitle>Saved</AlertTitle>
              <AlertDescription>Your changes are now live.</AlertDescription>
            </Alert>
          ),
        },
        {
          label: "Warning",
          element: (
            <Alert severity="warning">
              <TriangleAlert />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Please review before continuing.</AlertDescription>
            </Alert>
          ),
        },
        {
          label: "Critical",
          element: (
            <Alert severity="critical">
              <CircleAlert />
              <AlertTitle>Action required</AlertTitle>
              <AlertDescription>Something needs your attention.</AlertDescription>
            </Alert>
          ),
        },
      ],
    },
    {
      title: "Sizes",
      items: [
        {
          label: "Default",
          element: (
            <Alert severity="info">
              <Info />
              <AlertTitle>Default alert</AlertTitle>
              <AlertDescription>Standard padding and type scale.</AlertDescription>
            </Alert>
          ),
        },
        {
          label: "Compact",
          element: (
            <Alert severity="info" size="compact">
              <Info />
              <AlertTitle>Compact</AlertTitle>
              <AlertDescription>Tighter padding for dense surfaces.</AlertDescription>
            </Alert>
          ),
        },
      ],
    },
  ],
}

export default examples
