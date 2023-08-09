import prisma from "@/lib/prismadb"

export interface SearchParams {
  category: string
  division?: string
  district?: string
  upazilla?: string
}

export default async function getSearchedAdoptions(searchParams: SearchParams) {
  const { category, division, district, upazilla } = searchParams
  const adoptions = await prisma.adoptionApplication.findMany({
    where: {
      pet: {
        category: {
          equals: category,
        },
      },
      address: {
        division: {
          equals: division,
        },
        district: {
          equals: district,
        },
        upazilla: {
          equals: upazilla,
        },
      },
    },
    include: {
        pet: true,
        address: true,
        applicant: true,
    }
  })
  return adoptions
}
