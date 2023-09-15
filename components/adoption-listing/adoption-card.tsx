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
    <Link
      href={`/adoption/${data.id}`}
      className="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white"
    >
      <Image
        src={data.pet.imageSrc || ""}
        alt={data.pet.name || "pet image"}
        className="w-full rounded-md"
        width={200}
        height={200}
      />
      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Status</dt>
            <dd className="text-sm text-gray-500">Ready for adoption</dd>
          </div>

          <div>
            <dt className="sr-only">Pet Name</dt>
            <dd className="font-medium">{data.pet.name}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="h-4 w-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Species</p>

              <p className="font-medium">
                {data.pet.category[0].toUpperCase() +
                  data.pet.category.substring(1)}
              </p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="h-4 w-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Gender</p>

              <p className="font-medium">
                {data.pet.gender[0].toUpperCase() +
                  data.pet.gender.substring(1)}
              </p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="h-4 w-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Age</p>

              <p className="font-medium">{data.pet.age} years old</p>
            </div>
          </div>
        </div>
      </div>
      {actionButton && (
        <div className="top-4">
          <AdoptionDeleteButton id={data.id} applicantId={data.applicant.id} />
        </div>
      )}
    </Link>
  )
}

export default AdoptionCard
