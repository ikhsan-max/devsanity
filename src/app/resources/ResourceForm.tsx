"use client"
import { createResource } from "./action"
import { CATEGORIES } from "@/lib/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function ResourceForm() {
  const [category, setCategory] = useState<string>("")

  return (
    <form action={createResource} className="grid gap-4">
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
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
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
        <Button type="submit" disabled={!category}>
          Add
        </Button>
      </div>
    </form>
  )
}
