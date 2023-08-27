import prisma from "@/lib/prismadb"

export interface SearchParams {
  category: string
  lat: number
  lon: number
}

export default async function getSearchedAdoptions(searchParams: SearchParams) {
  const { category, lat, lon } = searchParams
  const adoptions = await prisma.adoptionApplication.findMany({
    where: {
      pet: {
        category: {
          equals: category,
        },
      },
      // search within 10km radius
      address: {
        lat: {
          lte: lat * 1 + 0.1,
          gte: lat * 1 - 0.1,
        },
        lon: {
          lte: lon * 1 + 0.1,
          gte: lon * 1 - 0.1,
        },
      },
    },
    include: {
      pet: true,
      address: true,
      applicant: true,
    },
  })

  return adoptions
}
