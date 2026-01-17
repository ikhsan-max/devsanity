"use server"

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"
import { isCategory } from "@/lib/categories"
export async function createResource(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim()
  const url = String(formData.get("url") ?? "").trim()
  const category = String(formData.get("category") ?? "").trim()
  const notes = String(formData.get("notes") ?? "").trim()

  if (!title || !url || !category) throw new Error("title, url, category wajib")
  if (!isCategory(category)) throw new Error("kategori tidak valid")
  await prisma.resource.create({
    data: { title, url, category, notes: notes || null },
  })

  revalidatePath("/resources")
}
export async function toggleUsed(id: number) {
  const current = await prisma.resource.findUnique({where: {id}})
  if (!current) throw new Error("Resource tidak ditemukan")

    await prisma.resource.update({
      where: {id},
      data: { used: !current.used},
    })
  revalidatePath("/resources")
}

  