import prisma from '@/lib/prismadb'

export interface PetListingParams {
    category?: string
    gender?: string
    ownerId?: string
    adopted?: boolean
}

// export interface Pet {
//     id: string
//     name: string
//     age: number
//     category: string
//     gender: string
//     imageSrc: string
//     description: string
//     adopted: boolean
//     createdAt: Date
//     ownerId: string
//     owner: {
//         id: string
//         name: string
//         email: string
//         emailVerified: null | Date
//         image: null | string
//         createdAt: Date
//         updateAt: Date
//         favoriteIds: []
//     },
//     adoptionApplication: {
//         id: string
//         name: string
//         email: string
//         phone: string
//         createdAt: Date
//         petId: string
//         applicantId: string
//         addressId: string
//         address: [Object]
//     }
// }

export default async function getPetListing(params: PetListingParams) {
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

    if(ownerId) {
        query.ownerId = ownerId
    }


    try {
        const petListing = await prisma?.pet.findMany({
            include: {
                owner: true,
                AdoptionApplication: {
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