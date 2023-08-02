import { User, Pet, AdoptionApplication, Address } from '@prisma/client'

export type SafePet = Omit<Pet, 'createdAt' | 'updatedAt'> & {
    createdAt: Date
    updatedAt: Date
}

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & {
    createdAt: Date
    updatedAt: Date
}


export type SafeAdoptionApplication = Omit<AdoptionApplication, 'createdAt' | 'updatedAt'> & {
    createdAt: Date
    updatedAt: Date
}

export type SafeAddress = Omit<Address, 'createdAt' | 'updatedAt'> & {
    createdAt: Date
    updatedAt: Date
}

export type SafeAdoptionWithAddress = SafeAdoptionApplication & {
    address: SafeAddress
}

export type SafePetListing = {
    pet: SafePet & {
        owner: SafeUser | null
        AdoptionApplication: SafeAdoptionWithAddress | null
    }
}

export type SafePetListings = SafePetListing[]