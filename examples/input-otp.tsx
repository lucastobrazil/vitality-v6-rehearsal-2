import type { ComponentExamples } from "@/lib/examples/types"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/vitality/ui/input-otp"

const examples: ComponentExamples = {
  axes: [
    {
      title: "Default",
      items: [
        {
          label: "6-digit code",
          element: (
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          ),
        },
      ],
    },
  ],
}

export default examples
