import type { ComponentExamples } from "@/lib/examples/types"
import { Button } from "@/registry/vitality/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/vitality/ui/dialog"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Default",
      items: [
        {
          label: "Confirmation",
          element: (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="primary">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
        },
      ],
    },
  ],
}

export default examples
