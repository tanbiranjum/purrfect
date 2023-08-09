import prisma from '@/lib/prismadb'

export default async function getAdoptionListing(id: string) {

    try {
        const adoptionListing = await prisma?.adoptionApplication.findUnique({
            include: {
                applicant: true,
                pet: true,
                address: true
            },
            where: {
                id
            }
        })

        return adoptionListing
    } catch (error) {
        console.log(error)
        return null
    }
}