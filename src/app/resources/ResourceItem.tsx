"use client"

import { useState } from "react"
import { deleteResource, toggleUsed } from "@/app/resources/actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { prettyDate } from "@/lib/utils"
import EditResourceForm from "@/app/resources/EditResourceForm"
import type { ResourceItemType } from "@/types/resource"


type Props = {
  item: ResourceItemType
}

export default function ResourceItem({ item }: Props) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className={item.used ? "opacity-80" : ""}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="font-semibold truncate">{item.title}</div>

              <Badge variant={item.used ? "secondary" : "default"}>
                {item.category}
              </Badge>

              {item.used && <Badge variant="outline">Used</Badge>}
            </div>

            <a
              className="text-sm text-muted-foreground underline break-all"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.url}
            </a>

            <div className="text-xs text-muted-foreground">
              {prettyDate(item.createdAt)}
            </div>

            {item.notes && (
              <div className="text-sm mt-2 whitespace-pre-wrap">
                {item.notes}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <form
              action={async () => {
                await toggleUsed(item.id)
              }}
            >
              <Button variant={item.used ? "secondary" : "outline"} type="submit">
                {item.used ? "Unmark" : "Mark used"}
              </Button>
            </form>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Close Edit" : "Edit"}
            </Button>

            <form
              action={async () => {
                await deleteResource(item.id)
              }}
            onSubmit={(e) => {
            if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
              e.preventDefault()
            }
          }}
            >
              <Button variant="destructive" size="sm" type="submit">
                Delete
              </Button>
            </form>
          </div>
        </div>

        {isEditing && (
          <EditResourceForm
            resource={item}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </CardContent>
    </Card>
  )
}