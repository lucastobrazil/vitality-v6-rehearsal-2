import type { ReactNode } from "react"

export interface ExampleItem {
  label: string
  element: ReactNode
  code?: string
}

export interface ExampleAxis {
  title: string
  description?: string
  items: ExampleItem[]
}

export interface ComponentExamples {
  axes: ExampleAxis[]
}
