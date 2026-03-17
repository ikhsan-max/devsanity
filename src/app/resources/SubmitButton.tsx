"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

type Props = {
  idleText: string
  loadingText: string
  spinner?: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export default function SubmitButton({
  idleText,
  loadingText,
  spinner,
  variant = "default",
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant={variant} disabled={pending}>
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