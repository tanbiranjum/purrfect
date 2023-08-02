import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Address, AdoptionApplication, Pet, User } from "@prisma/client"

import { SafePet, SafePetListing, SafeUser } from "@/app/types/index"

import PetDeleteButton from "./pet-delete-button"

export interface PetCardProps extends SafePetListing {
  actionButton?: boolean
}

const PetCard: React.FC<PetCardProps> = ({ pet, actionButton = false }) => {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-sm border-2 border-pink-500 pb-4 shadow-sm">
      <Link href={`/pet/${pet.id}`}>
        <Image
          src={pet.imageSrc || ""}
          alt={pet.name || "pet image"}
          className="aspect-square h-full w-full rounded-t-sm object-cover transition group-hover:scale-90"
          width={200}
          height={200}
        />
      </Link>
      <div className="mt-2 flex flex-col items-center justify-center">
        <Link href={`/pet/${pet.id}`}>
          <Link
            href={pet.id}
            className="text-xl font-bold text-gray-800 hover:underline"
          >
            {pet.name}
          </Link>
        </Link>
        <span className="text-md text-gray-500">{pet.category}</span>
      </div>
      {pet.adopted && (
        <div className="absolute left-0 top-0 rounded-sm bg-black p-2 text-sm text-white">
          Adopted
        </div>
      )}
      {actionButton && (
        <div className="top-4">
          <PetDeleteButton
            id={pet.AdoptionApplication?.id || ""}
            applicantId={pet.AdoptionApplication?.applicantId || ""}
          />
        </div>
      )}
    </div>
  )
}

export default PetCard
