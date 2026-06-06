import type { ComponentExamples } from "./types"

import alert from "@/examples/alert"
import alertDialog from "@/examples/alert-dialog"
import avatar from "@/examples/avatar"
import badge from "@/examples/badge"
import breadcrumb from "@/examples/breadcrumb"
import button from "@/examples/button"
import calendar from "@/examples/calendar"
import checkbox from "@/examples/checkbox"
import chip from "@/examples/chip"
import datePicker from "@/examples/date-picker"
import dateRangePicker from "@/examples/date-range-picker"
import dialog from "@/examples/dialog"
import field from "@/examples/field"
import input from "@/examples/input"
import inputGroup from "@/examples/input-group"
import inputOtp from "@/examples/input-otp"
import label from "@/examples/label"
import passwordInput from "@/examples/password-input"
import progress from "@/examples/progress"
import radioGroup from "@/examples/radio-group"
import select from "@/examples/select"
import spinner from "@/examples/spinner"
import statusBadge from "@/examples/status-badge"
import switchExample from "@/examples/switch"
import tabs from "@/examples/tabs"
import textarea from "@/examples/textarea"
import toaster from "@/examples/toaster"
import toggle from "@/examples/toggle"
import toggleGroup from "@/examples/toggle-group"

const registry: Record<string, ComponentExamples> = {
  alert,
  "alert-dialog": alertDialog,
  avatar,
  badge,
  breadcrumb,
  button,
  calendar,
  checkbox,
  chip,
  "date-picker": datePicker,
  "date-range-picker": dateRangePicker,
  dialog,
  field,
  input,
  "input-group": inputGroup,
  "input-otp": inputOtp,
  label,
  "password-input": passwordInput,
  progress,
  "radio-group": radioGroup,
  select,
  spinner,
  "status-badge": statusBadge,
  switch: switchExample,
  tabs,
  textarea,
  toaster,
  toggle,
  "toggle-group": toggleGroup,
}

export function getExamples(slug: string): ComponentExamples | null {
  return registry[slug] ?? null
}

export type { ComponentExamples, ExampleAxis, ExampleItem } from "./types"
