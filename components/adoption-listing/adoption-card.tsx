import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Address, AdoptionApplication, Pet, User } from "@prisma/client"

import { SafeAdoptionListing } from "@/app/types/index"

import AdoptionDeleteButton from "./adoption-delete-button"

export interface AdoptionCardProps {
  data: SafeAdoptionListing
  actionButton?: boolean
}

const AdoptionCard: React.FC<AdoptionCardProps> = ({
  data,
  actionButton = false,
}) => {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-sm border-2 border-pink-500 pb-4 shadow-sm">
      <Link href={`/pet/${data.id}`}>
        <Image
          src={data.pet.imageSrc || ""}
          alt={data.pet.name || "pet image"}
          className="aspect-square h-full w-full rounded-t-sm object-cover transition group-hover:scale-90"
          width={200}
          height={200}
        />
      </Link>
      <div className="mt-2 flex flex-col items-center justify-center">
        <Link href={`/pet/${data.id}`}>
          <Link
            href={data.id}
            className="text-xl font-bold text-gray-800 hover:underline"
          >
            {data.pet.name}
          </Link>
        </Link>
        <span className="text-md text-gray-500">{data.pet.category}</span>
      </div>
      {data.pet.adopted && (
        <div className="absolute left-0 top-0 rounded-sm bg-black p-2 text-sm text-white">
          Adopted
        </div>
      )}
      {actionButton && (
        <div className="top-4">
          <AdoptionDeleteButton id={data.id} applicantId={data.applicant.id} />
        </div>
      )}
    </div>
  )
}

export default AdoptionCard
