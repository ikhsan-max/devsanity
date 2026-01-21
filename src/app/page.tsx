import Link from "next/link"
import { prisma } from "@/app/lib/prisma" 
import { CardContent,CardHeader,CardTitle,Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function HomePage() {
  const [total, used] = await Promise.all([
    prisma.resource.count(),
    prisma.resource.count({ where: { used: true } }),
  ])
  const ratio = total === 0 ? 0 : Math.round((used / total) * 100)
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">DevSanity</h1>
        <p className="text-sm text-muted-foreground">
          Manajemen resource sederhana untuk developer.
        </p>
      </header> 
           <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Saved</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{total}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Used</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{used}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bullshit Ratio</CardTitle>
          </CardHeader>
          <CardContent className="flex items-baseline gap-2">
            <div className="text-3xl font-bold">{ratio}%</div>
            <Badge variant={ratio >= 50 ? "default" : "secondary"}>
              {ratio >= 50 ? "Builder" : "Collector"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button asChild>
          <Link href="/resources">Manage Resources</Link>
        </Button>
      </div>
    </main>
  )
}