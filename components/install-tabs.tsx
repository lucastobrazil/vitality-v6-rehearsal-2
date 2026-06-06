"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/vitality/ui/tabs"

export function InstallTabs({ command, source }: { command: string; source: string }) {
  return (
    <Tabs defaultValue="command" className="w-full">
      <TabsList>
        <TabsTrigger value="command">Command</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="command">
        <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{command}</code>
        </pre>
      </TabsContent>
      <TabsContent value="manual">
        <p className="mb-3 mt-3 text-sm text-muted-foreground">
          Copy the source into{" "}
          <code className="rounded bg-muted/40 px-1 font-mono text-xs">
            components/ui/&lt;name&gt;.tsx
          </code>
          .
        </p>
        <pre className="max-h-[60vh] overflow-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{source}</code>
        </pre>
      </TabsContent>
    </Tabs>
  )
}
