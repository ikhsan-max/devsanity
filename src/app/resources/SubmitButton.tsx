"use client"

import { Button } from "@/components/ui/button"
import { Category } from "@prisma/client"
import { useFormStatus } from "react-dom"

type Props = {
  idleText: string
  loadingText: string
  disabled?: boolean
  spinner?: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export default function SubmitButton({
  idleText,
  loadingText,
  spinner,
  disabled,
  variant = "default",
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant={variant} disabled={pending || disabled}>
      {pending ? (
        <span className="flex items-center gap-2">
          {spinner}
          {loadingText}
        </span>
      ) : (
        idleText
      )}
    </Button>
  )
}