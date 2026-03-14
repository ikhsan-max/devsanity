import { listResources } from "./actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Prisma, Category } from "@prisma/client"
import ResourceForm from "./ResourceForm"
import Filters from "./Filters"
import ResourcesStats from "@/components/ui/ResourcesStats"
import ResourcesList from "@/components/ui/ResourcesList"

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string }
}) {
  const q = (searchParams?.q ?? "").trim()
  const category = (searchParams?.category ?? "").trim()

  const where: Prisma.ResourceWhereInput  = {}
   const validCategories = Object.values(Category)
  if (category && validCategories.includes(category as Category)) {
    where.category = category as Category
  }
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { url: { contains: q } },
      { notes: { contains: q } },
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
      <ResourcesStats total={total} used={used} ratio={ratio} />
      <Card>
        <CardHeader>
          <CardTitle>Tambah Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceForm />
        </CardContent>
      </Card>
      <ResourcesList items={items} />
    </main>
  )
}
