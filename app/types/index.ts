import { Address, AdoptionApplication, Pet, User } from "@prisma/client"

export type SafePet = Omit<Pet, "createdAt" | "updatedAt"> & {
  createdAt: Date
  updatedAt: Date
}

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: Date
  updatedAt: Date
}

export type SafeAdoptionApplication = Omit<
  AdoptionApplication,
  "createdAt" | "updatedAt"
> & {
  createdAt: Date
  updatedAt: Date
}

export type SafeAddress = Omit<Address, "createdAt" | "updatedAt"> & {
  createdAt: Date
  updatedAt: Date
}

export type SafeAdoptionWithAddress = SafeAdoptionApplication & {
  address: SafeAddress
}

// export type SafePetListing = {
//     pet: SafePet & {
//         owner: SafeUser | null
//         AdoptionApplication: SafeAdoptionWithAddress | null
//     }
// }

export type SafeAdoptionListing = SafeAdoptionApplication & {
  pet: SafePet
  applicant: SafeUser
  address: SafeAddress
}

export interface IFilterParams {
  adopted?: boolean
  category?: string
  lat?: number
  lon?: number
  age?: string
  gender?: string
  page?: number
  applicantId?: string
}
