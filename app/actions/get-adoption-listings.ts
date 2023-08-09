import prisma from '@/lib/prismadb'

export interface AdoptionListingParams {
    category?: string
    gender?: string
    ownerId?: string
    adopted?: boolean
}

export default async function getAdoptionListings(params: AdoptionListingParams) {
    const { category, gender, ownerId, adopted } = params

    let query: any = {}

    if (adopted) {
        query.adopted = adopted
    }

    if (category) {
        query.category = category
    }

    if (gender) {
        query.gender = gender
    }

    if (ownerId) {
        query.ownerId = ownerId
    }


    try {
        const adoptionListing = await prisma?.adoptionApplication.findMany({
            include: {
                applicant: true,
                pet: true,
                address: true
            },
            where: {
                pet: query
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return adoptionListing
    } catch (error) {
        console.log(error)
        return null
    }
}