import { listResources, deleteResource, toggleUsed } from "./action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ResourceForm from "./ResourceForm"
import { Database, CheckCircle, Percent } from "lucide-react"
import Filters from "./Filters"

function prettyDate(d: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d)
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string }
}) {
  const q = (searchParams?.q ?? "").trim()
  const category = (searchParams?.category ?? "").trim()

  const where: any = {}
  if (category) where.category = category
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { url: { contains: q, mode: "insensitive" } },
      { notes: { contains: q, mode: "insensitive" } },
    ]
  }

  const items = await listResources({ where })
  const total = items.length
  const used = items.filter((i) => i.used).length
  const ratio = total === 0 ? 0 : Math.round((used / total) * 100)

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-sm text-muted-foreground">
          Tambahkan link yang beneran kamu pakai. Bukan koleksi dopamin.
        </p>
      </header>

      <Filters />
      <div className="text-sm text-muted-foreground">
        Showing {items.length} result(s)
        {category ? ` - category: ${category}` : ""}
        {q ? ` - query: "${q}"` : ""}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
          <Database className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">Entri terdaftar</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Used Resources</CardTitle>
          <CheckCircle className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{used}</div>
          <Badge variant="secondary" className="mt-1">
            Aktif
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Usage Ratio</CardTitle>
          <Percent className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">{ratio}%</div>
            <Badge variant={ratio > 70 ? "destructive" : "default"}>
              {ratio > 50 ? "High" : "Normal"}
            </Badge>
          </div>
          <div className="w-full bg-secondary h-2 mt-3 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${ratio}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceForm />
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">List</h2>
          <div className="text-sm text-muted-foreground">Total: {items.length}</div>
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
                      <Badge variant={r.used ? "secondary" : "default"}>{r.category}</Badge>
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

                    <div className="text-xs text-muted-foreground">{prettyDate(r.createdAt)}</div>

                    {r.notes ? (
                      <div className="text-sm mt-2 whitespace-pre-wrap">{r.notes}</div>
                    ) : null}
                  </div>

                  <form
                    action={async () => {
                      "use server"
                      await toggleUsed(r.id)
                    }}
                  >
                    <Button variant={r.used ? "secondary" : "outline"} type="submit">
                      {r.used ? "Unmark" : "Mark used"}
                    </Button>
                  </form>
                  <form
                    action={async () => {
                      "use server"
                      await deleteResource(r.id)
                    }}
                  >
                    <Button variant="destructive" size="sm" type="submit">
                      Delete
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
