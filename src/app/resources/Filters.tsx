"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { CATEGORIES } from "@/lib/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMemo, useState } from "react"

export default function Filters() {
  const router = useRouter()
  const sp = useSearchParams()
  const initialQ = sp.get("q") ?? ""
  const initialCategory = sp.get("category") ?? ""
  const [q, setQ] = useState(initialQ)
  const [category, setCategory] = useState(initialCategory)
  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    if (q.trim()) params.set("q", q.trim())
    if (category) params.set("category", category)
    const s = params.toString()
    return s ? `?${s}` : ""
  }, [q, category])
return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="grid gap-2 w-full md:max-w-sm">
        <div className="text-sm font-medium">Search</div>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari title / url / notes..."
        />
      </div>

      <div className="grid gap-2 w-full md:max-w-xs">
        <div className="text-sm font-medium">Category</div>
        <Select value={category || undefined} onValueChange={(val) => setCategory(val === "all" ? "" : val)}>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => router.push(`/resources${queryString}`)}>
          Apply
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setQ("")
            setCategory("")
            router.push("/resources")
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
