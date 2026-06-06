import { CreditCard, Search } from "lucide-react"

import type { ComponentExamples } from "@/lib/examples/types"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/vitality/ui/input-group"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Addon positions",
      items: [
        {
          label: "Leading icon",
          element: (
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search" />
            </InputGroup>
          ),
        },
        {
          label: "Trailing icon",
          element: (
            <InputGroup>
              <InputGroupInput placeholder="Card number" />
              <InputGroupAddon align="inline-end">
                <CreditCard />
              </InputGroupAddon>
            </InputGroup>
          ),
        },
        {
          label: "Leading text",
          element: (
            <InputGroup>
              <InputGroupAddon align="inline-start">https://</InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
          ),
        },
      ],
    },
  ],
}

export default examples
