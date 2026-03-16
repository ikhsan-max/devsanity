import { Database, CheckCircle, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  total: number
  used: number
  ratio: number
}

export default function ResourcesStats({ total, used, ratio }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
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
            <Badge
              variant={
                ratio >= 70 ? "default" : ratio >= 40 ? "secondary" : "destructive"
              }
            >
              {ratio >= 70 ? "Healthy" : ratio >= 40 ? "Okay" : "Low"}
            </Badge>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${Math.min(ratio, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}