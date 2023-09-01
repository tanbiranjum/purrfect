import React from "react"
import Image from "next/image"
import { AdoptionRequest } from "@prisma/client"

import AdoptionRequestListing from "@/components/adoption-listing/adoption-request-listing"
import ApplyForm from "@/components/form/apply-form"
import getAdoptionListing from "@/app/actions/get-adoption-listing"
import getAdoptionRequest, {
  getAdoptionRequestByUser,
} from "@/app/actions/get-adoption-request"
import getCurrentUser from "@/app/actions/get-current-user"

const AdoptionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const adoption = await getAdoptionListing(id)
  const user = await getCurrentUser()

  const isOwner = adoption?.applicantId === user?.id ? true : false

  let adoptionRequests: AdoptionRequest[] | void = []
  let adoptionRequest: AdoptionRequest | void

  if (isOwner) {
    adoptionRequests = await getAdoptionRequest(id)
  } else {
    adoptionRequest = await getAdoptionRequestByUser(user?.id as string, id)
  }
  return (
    <div className="container">
      <div className="grid grid-cols-5 gap-10 pb-8 pt-6 md:py-10">
        <div className="col-span-5 md:col-span-2 flex">
          <div className="bg-white p-4 rounded-md">
            <Image
              src={adoption?.pet.imageSrc as string}
              alt="pet image"
              width={500}
              height={500}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="col-span-5 md:col-span-3">
          <div className="h-full w-full grid grid-cols-8 gap-4">
            <div className="rounded-md border bg-white p-6 col-span-4">
              <h1 className="text-2xl font-semibold">{adoption?.pet.name}</h1>
              <div className="flex">
                <div className="w-5/12">
                  <p className="text-md font-medium leading-loose text-gray-900">
                    Category
                  </p>
                  <p className="text-md font-medium leading-loose text-gray-900">
                    Gender
                  </p>
                  <p className="text-md font-medium leading-loose text-gray-900">
                    Age
                  </p>
                </div>
                <div className="">
                  <p className="text-md capitalize leading-loose text-gray-500">
                    {adoption?.pet.category}
                  </p>
                  <p className="text-md capitalize leading-loose text-gray-500">
                    {adoption?.pet.gender}
                  </p>
                  <p className="text-md leading-loose text-gray-500">
                    {adoption?.pet.age} years old
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-md border bg-white p-6 col-span-4">
              <h1 className="text-2xl font-semibold">Contact</h1>
              <div className="flex">
                <div className="w-5/12">
                  <p className="text-md font-medium leading-loose text-gray-900">
                    Name
                  </p>
                  <p className="text-md font-medium leading-loose text-gray-900">
                    Email
                  </p>
                  <p className="text-md font-medium leading-loose text-gray-900">
                    Phone
                  </p>
                </div>
                <div>
                  <p className="text-md leading-loose text-gray-500">
                    {adoption?.applicant.name}
                  </p>
                  <p className="text-md leading-loose text-gray-500">
                    {adoption?.email}
                  </p>
                  <p className="text-md leading-loose text-gray-500">
                    {adoption?.phone}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-md border bg-white p-6 col-span-8">
              <h1 className="text-2xl font-semibold">Location</h1>
              <div className="flex">
                <p className="text-md text-gray-500">
                  {adoption?.address.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="rounded-md border bg-white p-6">
        <h1 className="text-2xl font-semibold">Description</h1>
        <p className="text-md text-gray-500">{adoption?.pet.description}</p>
      </div>
      <div className="mt-4">
        {!isOwner &&
          (adoptionRequest ? (
            <div className="p-6 bg-white rounded-md">
              <p>You have applied already</p>
              <div className="flex items-center">
                Status:{" "}
                {adoptionRequest.accepted ? (
                  <p className="text-green-500 font-semibold p-1">Accepted</p>
                ) : (
                  <p className="text-yellow-500 font-semibold p-1">Pending</p>
                )}
              </div>
            </div>
          ) : (
            <ApplyForm adoptionId={adoption?.id as string} />
          ))}
      </div>
      {isOwner && (
        <div className="mt-4">
          <AdoptionRequestListing adoptionRequestListings={adoptionRequests} />
        </div>
      )}
    </div>
  )
}

export default AdoptionPage
