import * as z from "zod"

export const adoptionSchema = z.object({
    name: z.string().min(3).max(100),
    category: z.string().min(3).max(100),
})