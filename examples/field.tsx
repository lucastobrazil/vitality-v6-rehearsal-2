import type { ComponentExamples } from "@/lib/examples/types"
import { Field, FieldDescription, FieldLabel } from "@/registry/vitality/ui/field"
import { Input } from "@/registry/vitality/ui/input"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Orientations",
      items: [
        {
          label: "Vertical (default)",
          element: (
            <Field>
              <FieldLabel htmlFor="vertical-input">Email</FieldLabel>
              <Input id="vertical-input" type="email" placeholder="you@example.com" />
              <FieldDescription>We&apos;ll never share your email.</FieldDescription>
            </Field>
          ),
        },
        {
          label: "Horizontal",
          element: (
            <Field orientation="horizontal">
              <FieldLabel htmlFor="horizontal-input">Email</FieldLabel>
              <Input id="horizontal-input" type="email" placeholder="you@example.com" />
            </Field>
          ),
        },
        {
          label: "Responsive",
          element: (
            <Field orientation="responsive">
              <FieldLabel htmlFor="responsive-input">Email</FieldLabel>
              <Input id="responsive-input" type="email" placeholder="you@example.com" />
            </Field>
          ),
        },
      ],
    },
  ],
}

export default examples
