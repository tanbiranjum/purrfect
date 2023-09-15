import React from "react"
import Image from "next/image"
import { AdoptionRequest } from "@prisma/client"

import { Button } from "@/components/ui/button"
import AdoptionRequestListing from "@/components/adoption-listing/adoption-request-listing"
import ClientOnly from "@/components/client-only"
import CurrentLocation from "@/components/current-location"
import ApplyForm from "@/components/form/apply-form"
import Map from "@/components/map/map"
import getAdoptionListing from "@/app/actions/get-adoption-listing"
import getAdoptionRequest, {
  getAdoptionRequestByUser,
} from "@/app/actions/get-adoption-request"
import getCurrentUser from "@/app/actions/get-current-user"

const AdoptionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const adoptionData = getAdoptionListing(id)
  const userData = getCurrentUser()

  const [adoption, user] = await Promise.all([adoptionData, userData])

  const isOwner = adoption?.applicantId === user?.id ? true : false

  let adoptionRequests: AdoptionRequest[] | void = []
  let adoptionRequest: AdoptionRequest | void

  if (isOwner) {
    adoptionRequests = await getAdoptionRequest(id)
  } else {
    adoptionRequest = await getAdoptionRequestByUser(user?.id as string, id)
  }
  return (
    <div className="bg-white py-4">
      <div className="container">
        <h2 className="text-4xl font-semibold py-6">{adoption?.pet.name}</h2>
        <div className="grid grid-cols-5 gap-10 pb-8">
          <div className="col-span-5 md:col-span-2">
            <div className="rounded-md flex flex-col gap-4">
              <Image
                src={adoption?.pet.imageSrc as string}
                alt="pet image"
                width={500}
                height={500}
                className="rounded-md"
              />
              <div className="flex justify-between">
                <div
                  className={`flex flex-col items-center justify-center ${
                    adoption?.adopted
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  } py-2 px-8 rounded-md shadow-sm border`}
                >
                  <p>Status</p>
                  <p className="font-semibold">
                    {adoption?.adopted
                      ? "Adopted".toUpperCase()
                      : "Not yet".toUpperCase()}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center bg-white py-2 border px-8 rounded-md shadow-sm">
                  <p>Species</p>
                  <p className="font-semibold">
                    {adoption?.pet.category.toUpperCase()}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center bg-white py-2 border px-8 rounded-md shadow-sm">
                  <p>Age</p>
                  <p className="font-semibold">{adoption?.pet.age}</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-white py-2 border px-8 rounded-md shadow-sm">
                  <p>Gender</p>
                  <p className="font-semibold">
                    {adoption?.pet.gender.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 md:col-span-3">
            {/* CUSTOM DESCRIPTION START */}
            <div className="border shadow-sm rounded-md p-6 h-full">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Applicant Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-50">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {adoption?.applicant.name}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Mobile No
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {adoption?.phone}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {adoption?.email}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      About
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {adoption?.pet.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* CUSTOM DESCRIPTION END */}
          </div>
        </div>
        {/* LOCATION START */}
        <div className="w-full flex flex-col gap-4">
          <div className="rounded-md border bg-white p-6">
            <h1 className="text-2xl font-semibold">Location</h1>
            <div className="flex flex-col">
              <p className="text-md text-gray-500 py-3">
                {adoption?.address.address}
              </p>
              <div>
                <CurrentLocation
                  lat={adoption?.address.lat}
                  lon={adoption?.address.lon}
                />
              </div>
            </div>
          </div>
        </div>
        {/* LOCATION END */}
        {!adoption?.adopted && (
          <div className="mt-4">
            {!isOwner &&
              (adoptionRequest ? (
                <div className="p-6 bg-white rounded-md">
                  <p>You have applied already</p>
                  <div className="flex items-center">
                    Status:{" "}
                    {adoptionRequest.accepted ? (
                      <p className="text-green-500 font-semibold p-1">
                        Accepted
                      </p>
                    ) : (
                      <p className="text-yellow-500 font-semibold p-1">
                        Pending
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <ApplyForm adoptionId={adoption?.id as string} />
              ))}
          </div>
        )}
        {isOwner && !adoption?.adopted && (
          <div className="mt-4">
            <AdoptionRequestListing
              adoptionRequestListings={adoptionRequests}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdoptionPage
