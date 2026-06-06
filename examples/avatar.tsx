import type { ComponentExamples } from "@/lib/examples/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/vitality/ui/avatar"

const SRC = "https://github.com/shadcn.png"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Sizes",
      items: [
        {
          label: "Small",
          element: (
            <Avatar size="sm">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "Default",
          element: (
            <Avatar>
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "Large",
          element: (
            <Avatar size="lg">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          ),
        },
      ],
    },
    {
      title: "Variants",
      items: [
        {
          label: "Neutral",
          element: (
            <Avatar variant="neutral">
              <AvatarFallback>LA</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "Primary",
          element: (
            <Avatar variant="primary">
              <AvatarFallback>LA</AvatarFallback>
            </Avatar>
          ),
        },
      ],
    },
    {
      title: "Fallback",
      items: [
        {
          label: "Initials",
          element: (
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "Image with fallback",
          element: (
            <Avatar>
              <AvatarImage src="https://invalid.example/img.png" alt="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
        },
      ],
    },
  ],
}

export default examples
