import React from "react"
import Image from "next/image"
import { AdoptionRequest } from "@prisma/client"

import { FetchLocation } from "@/lib/fetch-location"
import AdoptionRequestListing from "@/components/adoption-listing/adoption-request-listing"
import ApplyForm from "@/components/form/apply-form"
import getAdoptionListing from "@/app/actions/get-adoption-listing"
import getAdoptionRequest from "@/app/actions/get-adoption-request"

const AdoptionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const adoption = await getAdoptionListing(id)

  let adoptionRequest: AdoptionRequest[] | void = []

  if (adoption?.id === id && !adoption.adopted) {
    adoptionRequest = await getAdoptionRequest(id)
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="grid grid-cols-5 pb-8 pt-6 md:py-10">
        <div className="col-span-5 md:col-span-3">
          <Image
            src={adoption?.pet.imageSrc as string}
            alt=""
            width={500}
            height={500}
            className="rounded-md"
          />
        </div>
        <div className="col-span-5 md:col-span-2">
          <div className="h-full space-y-4">
            <div className="rounded-md border bg-white p-6">
              <h1 className="text-2xl font-bold">{adoption?.pet.name}</h1>
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
            <div className="rounded-md border bg-white p-6">
              <h1 className="text-2xl font-bold">Owner</h1>
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
            <div className="rounded-md border bg-white p-6">
              <h1 className="text-2xl font-bold">Address</h1>
              <div className="flex gap-2">
                <p className="text-md text-gray-500">
                  {adoption?.address.address} {" - "}
                </p>
                <p className="text-md text-gray-500">
                  {adoption?.address.lat} {" - "}
                </p>
                <p className="text-md text-gray-500">{adoption?.address.lon}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="rounded-md border bg-white p-6">
        <h1 className="text-2xl font-bold">Description</h1>
        <p className="text-md text-gray-500">{adoption?.pet.description}</p>
      </div>
      {id === adoption?.id ? (
        <p>This is your pet</p>
      ) : (
        <ApplyForm adoptionId={adoption?.id as string} />
      )}
      <div>
        <h1 className="text-2xl font-bold">Requests</h1>
        {!adoption?.adopted && (
          <AdoptionRequestListing adoptionRequestListings={adoptionRequest} />
        )}
      </div>
    </div>
  )
}

export default AdoptionPage
