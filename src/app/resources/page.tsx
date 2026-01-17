import { prisma } from "@/app/lib/prisma"
import { createResource, toggleUsed } from "./action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import ResourceForm from "./ResourceForm"

import { CATEGORIES } from "@/lib/categories"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


function prettyDate(d: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",  
    month: "short",
    day: "2-digit",
  }).format(d)
}

export default async function ResourcesPage() {
  const items = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-sm text-muted-foreground">
          Tambahkan link yang beneran kamu pakai. Bukan koleksi dopamin.
        </p>
        </header>
      <Card>
        <CardHeader>
          <CardTitle>Tambah Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceForm className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>

            {/* Hidden input send value ke -> server action */}
            <input type="hidden" name="category" id="category" value={""} />

            {/* Select */}
            <Select
              onValueChange={(val) => {
                // hidden input 
                const el = document.getElementById("category") as HTMLInputElement | null
                if (el) el.value = val
              }}
            >
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
              <Button type="submit">Add</Button>
            </div>
          </ResourceForm>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">List</h2>
          <div className="text-sm text-muted-foreground">
            Total: {items.length}
          </div>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Belum ada resource. Bagus. Sekarang isi yang beneran kamu pakai.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {items.map((r) => (
              <Card key={r.id} className={r.used ? "opacity-80" : ""}>
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold truncate">{r.title}</div>
                      <Badge variant={r.used ? "secondary" : "default"}>
                        {r.category}
                      </Badge>
                      {r.used ? <Badge variant="outline">Used</Badge> : null}
                    </div>

                    <a
                      className="text-sm text-muted-foreground underline break-all"
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r.url}
                    </a>

                    <div className="text-xs text-muted-foreground">
                      {prettyDate(r.createdAt)}
                    </div>

                    {r.notes ? (
                      <div className="text-sm mt-2 whitespace-pre-wrap">
                        {r.notes}
                      </div>
                    ) : null}
                  </div>

                  <form action={async () => {
                    "use server"
                    await toggleUsed(r.id)
                  }}>
                    <Button variant={r.used ? "secondary" : "outline"} type="submit">
                      {r.used ? "Unmark" : "Mark used"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

     
      <ul style={{ marginTop: 24, display: "grid", gap: 8 }}>
        {items.map((r) => (
          <li key={r.id} style={{ border: "1px solid #333", padding: 12, borderRadius: 10 }}>
            <div style={{ fontWeight: 700 }}>{r.title}</div>
            <div style={{ opacity: 0.8 }}>{r.category}</div>
            <a href={r.url} target="_blank" rel="noreferrer">
              {r.url}
            </a>
            {r.notes ? <div style={{ marginTop: 6 }}>{r.notes}</div> : null}
          </li>
        ))}
      </ul>
      </section>
    </main>
  )
}
