import { PrismaClient } from "@prisma/client"
const globalforprisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalforprisma.prisma ??
new PrismaClient({
    log: ["error", "warn"]
})

if (process.env.NODE_ENV !== "production") globalforprisma.prisma = prisma  