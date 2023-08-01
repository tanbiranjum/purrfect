import prisma from '@/lib/prismadb'

export interface PetListingParams {
    category: string
    gender: string
}

export default async function getPetListing(params: PetListingParams) {
    const { category, gender } = params

    let query: any = {
        adopted: false,
    }

    if (category) {
        query.category = category
    }

    if (gender) {
        query.gender = gender
    }


    try {
        const petListing = await prisma?.pet.findMany({
            include: {
                owner: true,
                adoptionApplication: {
                    include: {
                        address: true,
                    }
                }
            },
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        return petListing
    } catch (error) {
        console.log(error)
        return null
    }
}