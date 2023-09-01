import React from "react"
import Image from "next/image"
import Link from "next/link"

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
    <div className="group relative flex flex-col items-center justify-center rounded-sm border-2 p-4 bg-white shadow-sm">
      <Link href={`/adoption/${data.id}`}>
        <Image
          src={data.pet.imageSrc || ""}
          alt={data.pet.name || "pet image"}
          className="aspect-square h-full w-full object-cover rounded-sm transition group-hover:scale-90"
          width={200}
          height={200}
        />
      </Link>
      <div className="mt-2 flex flex-col items-center justify-center">
        <Link href={`/adoption/${data.id}`}>
          <Link
            href={`adoption/${data.id}`}
            className="flex items-baseline gap-2 text-gray-800 hover:underline"
          >
              <p className="text-xl font-semibold">{data.pet.name}</p>
              <p className="text-sm">- {data.pet.age} year old</p>
          </Link>
        </Link>
        {/* <span className="text-md text-gray-500">{data.pet.category}</span> */}
      </div>
      {data.adopted && (
        <div className="absolute -left-6 top-0 -rotate-45 rounded-sm bg-pink-600 px-4 py-2  text-sm text-white">
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
