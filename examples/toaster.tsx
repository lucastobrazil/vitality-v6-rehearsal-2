import { CircleCheck, Info, OctagonX, TriangleAlert } from "lucide-react"

import type { ComponentExamples } from "@/lib/examples/types"

function ToastPreview({
  icon,
  title,
  body,
  className,
}: {
  icon: React.ReactNode
  title: string
  body: string
  className: string
}) {
  return (
    <div
      className={`flex w-full max-w-sm items-start gap-3 rounded-md border px-3 py-2.5 text-sm shadow-sm ${className}`}
    >
      <span className="mt-0.5 [&_svg]:size-4">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <p className="font-medium">{title}</p>
        <p className="text-xs opacity-80">{body}</p>
      </div>
    </div>
  )
}

const examples: ComponentExamples = {
  axes: [
    {
      title: "Variants",
      description:
        "Static previews of the four toast variants. In your app, mount <Toaster /> in the root layout and call toast.success(), toast.error(), toast.warning(), or toast.message() from any event handler.",
      items: [
        {
          label: "Info — toast.message()",
          element: (
            <ToastPreview
              icon={<Info className="text-info" />}
              title="Heads up"
              body="Triggered via toast.message()."
              className="border-info/30 bg-info/10 text-info-foreground"
            />
          ),
          code: 'toast.message("Heads up")',
        },
        {
          label: "Success — toast.success()",
          element: (
            <ToastPreview
              icon={<CircleCheck className="text-success" />}
              title="Saved"
              body="Triggered via toast.success()."
              className="border-success/30 bg-success/10 text-success-foreground"
            />
          ),
          code: 'toast.success("Saved")',
        },
        {
          label: "Warning — toast.warning()",
          element: (
            <ToastPreview
              icon={<TriangleAlert className="text-warning" />}
              title="Heads up"
              body="Triggered via toast.warning()."
              className="border-warning/30 bg-warning/10 text-warning-foreground"
            />
          ),
          code: 'toast.warning("Heads up")',
        },
        {
          label: "Error — toast.error()",
          element: (
            <ToastPreview
              icon={<OctagonX className="text-destructive" />}
              title="Something went wrong"
              body="Triggered via toast.error()."
              className="border-destructive/30 bg-destructive/10 text-destructive"
            />
          ),
          code: 'toast.error("Something went wrong")',
        },
      ],
    },
  ],
}

export default examples
