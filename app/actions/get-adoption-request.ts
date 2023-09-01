import prisma from '@/lib/prismadb'
import { AdoptionRequest } from '@prisma/client'

export default async function getAdoptionRequest(id: string): Promise<AdoptionRequest[] | void> {

    const adoptionRequest = await prisma.adoptionRequest.findMany({
        where: {
            adoptionApplicationId: id
        },
    })

    if (!adoptionRequest) {
        return
    }

    return adoptionRequest
}

export async function getAdoptionRequestByUser(userId: string, adoptionId: string): Promise<AdoptionRequest | void> {
    const adoptionRequest = await prisma.adoptionRequest.findFirst({
        where: {
            applicantId: userId,
            adoptionApplicationId: adoptionId
        }
    })

    if (!adoptionRequest) {
        return
    }

    return adoptionRequest
}