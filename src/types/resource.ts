import { Category } from "@prisma/client"
export type ResourceItemType = {
    id: number
    title: string
    url: string
    category: Category
    used: boolean
    notes: string | null
    createdAt: Date
}   