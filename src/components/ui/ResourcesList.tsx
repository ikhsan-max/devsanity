import ResourceItem from "./ResourceItem"

type Resource = {
  id: number
  title: string
  url: string
  category: string
  used: boolean
  notes: string | null
  createdAt: Date
}
type Props = {
  items: Resource[]
}
export default function ResourcesList({ items }: Props) {
 if (items.length === 0) {
    return (
        <div className="p-6 text-sm text-muted-foreground">
            No resources found. Try adjusting your search or filters.
            </div>
    )
 }
   return (
    <div className="space-y-4">
      {items.map((item) => (
        <ResourceItem key={item.id} item={item} />
      ))}
    </div>
  )

}

