import * as z from "zod"

export const adoptionSchema = z.object({
    name: z.string().min(3).max(100),
    category: z.string().min(3).max(100),
    gender: z.string().min(3).max(100),
    age: z.coerce.number().min(0).max(50),
    ownerName: z.string().min(3).max(100),
    ownerPhone: z.string().min(3).max(100),
    ownerEmail: z.string().email(),
    address: z.string().min(3).max(200),
    lat: z.number().min(3).max(100),
    lon: z.number().min(3).max(100),
    description: z.string().min(3).max(500),
})