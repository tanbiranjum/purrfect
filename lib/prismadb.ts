import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client
}

export default client

// HotReload cause bunch of prisma client. So to get rid of it we can use this