import * as z from "zod"

export const adoptionSchema = z.object({
    name: z.string().min(3).max(100),
    category: z.string().min(3).max(100),
    gender: z.string().min(3).max(100),
    age: z.string().min(1).max(100).regex(/^[0-9]+$/, { message: "Please provide a valid age" }),
    imageSrc: z.string().url({ message: "Please provide pet image" }),
    ownerName: z.string().min(3).max(100),
    ownerPhone: z.string().min(3).max(100),
    ownerEmail: z.string().email(),
    division: z.string().min(1),
    district: z.string().min(1),
    upazilla: z.string().min(1),
    description: z.string().min(3).max(500),
})