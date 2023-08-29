import prisma from "@/lib/prismadb"

export interface SearchParams {
  category?: string
  lat?: number
  lon?: number
  age?: string
  gender?: string
}

type Query = {
  pet?: {
    category?: {
      equals: string
    }
    gender?: {
      equals: string
    }
    age?: {
      gte?: number
      lte?: number
    }
  }
  address?: {
    lat: {
      lte: number
      gte: number
    }
    lon: {
      lte: number
      gte: number
    }
  }
}

export default async function getSearchedAdoptions(searchParams: SearchParams) {
  const { category, lat, lon, age, gender } = searchParams

  let ageRange: number[] = []

  if (age) {
    if (age.includes("-")) {
      ageRange = age.split("-").map((item: string) => parseInt(item))
    } else {
      ageRange[0] = parseInt(age)
    }
  }

  const query: Query = {}
  // build query
  if (category) {
    query.pet = {
      ...query.pet,
      category: {
        equals: category,
      },
    }
  }
  if (gender) {
    query.pet = {
      ...query.pet,
      gender: {
        equals: gender,
      },
    }
  }
  if (age) {
    if (ageRange.length === 2) {
      query.pet = {
        ...query.pet,
        age: {
          gte: ageRange[0],
          lte: ageRange[1],
        },
      }
    } else {
      query.pet = {
        ...query.pet,
        age: {
          gte: ageRange[0],
        },
      }
    }
  }
  if (lat && lon) {
    query.address = {
      lat: {
        lte: lat * 1 + 0.1,
        gte: lat * 1 - 0.1,
      },
      lon: {
        lte: lon * 1 + 0.1,
        gte: lon * 1 - 0.1,
      },
    }
  }

  const adoptions = await prisma.adoptionApplication.findMany({
    where: query,
    include: {
      pet: true,
      address: true,
      applicant: true,
    },
  })

  return adoptions
}
