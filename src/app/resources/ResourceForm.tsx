"use client"
import { createResource } from "./actions"
import { CATEGORIES } from "@/lib/categories"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useRef  } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import type{ Category } from "@prisma/client"
import SubmitButton from "./SubmitButton"
export default function ResourceForm() {
  const [category, setCategory] = useState<Category | "">("")
  const formRef = useRef<HTMLFormElement>(null)  
  const handleSubmit = async (formData: FormData) => {
    const res = await createResource(formData)  
    if (res?.success) {
      toast.success("Resource created successfully")
      formRef.current?.reset()
      setCategory("")
    } else {
      toast.error(`Failed to create resource: ${res?.error || "Unknown error"}`)
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="React Docs" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="url">URL</Label>
        <Input id="url" name="url" placeholder="https://..." required />
      </div>

      <div className="grid gap-2">
        <Label>Category</Label>
        <input type="hidden" name="category" value={category} />
        <Select value={category || undefined} 
        onValueChange={(value) => setCategory(value as Category)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Kenapa ini penting?" />
      </div>

      <div className="flex justify-end">
        <SubmitButton
          idleText="Add"
          loadingText="Adding..."
          spinner={<Loader2 className="animate-spin" />}
          disabled={!category}
        />
      </div>
    </form>
  )
}
