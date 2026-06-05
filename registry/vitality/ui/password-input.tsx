"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/registry/vitality/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/registry/vitality/ui/input-group"

type InputProps = React.ComponentProps<typeof Input>

interface PasswordInputProps extends Omit<InputProps, "type"> {}

function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <InputGroup className={className}>
      <Input
        data-slot="input-group-control"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
export type { PasswordInputProps }
