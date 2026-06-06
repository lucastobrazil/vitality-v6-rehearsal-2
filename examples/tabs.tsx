import type { ComponentExamples } from "@/lib/examples/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/vitality/ui/tabs"

function TabsExample({ variant }: { variant: "default" | "line" }) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList variant={variant}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="pt-3 text-sm text-muted-foreground">Account details.</p>
      </TabsContent>
      <TabsContent value="billing">
        <p className="pt-3 text-sm text-muted-foreground">Billing settings.</p>
      </TabsContent>
      <TabsContent value="team">
        <p className="pt-3 text-sm text-muted-foreground">Team members.</p>
      </TabsContent>
    </Tabs>
  )
}

const examples: ComponentExamples = {
  axes: [
    {
      title: "Variants",
      items: [
        { label: "Default", element: <TabsExample variant="default" /> },
        { label: "Line", element: <TabsExample variant="line" /> },
      ],
    },
  ],
}

export default examples
