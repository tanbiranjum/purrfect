import React from "react"
import Image from "next/image"

import { FetchLocation } from "@/lib/fetch-location"
import { Button } from "@/components/ui/button"
import ApplyForm from "@/components/form/apply-form"
import getAdoptionListing from "@/app/actions/get-adoption-listing"

const AdoptionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const adoption = await getAdoptionListing(id)
  const location = new FetchLocation()
  return (
    <div className="max-w-screen-lg mx-auto">
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
            <div className="border rounded-md bg-white p-6">
              <h1 className="text-2xl font-bold">{adoption?.pet.name}</h1>
              <div className="flex">
                <div className="w-5/12">
                  <p className="text-md leading-loose font-medium text-gray-900">
                    Category
                  </p>
                  <p className="text-md leading-loose font-medium text-gray-900">
                    Gender
                  </p>
                  <p className="text-md leading-loose font-medium text-gray-900">
                    Age
                  </p>
                </div>
                <div className="">
                  <p className="text-md leading-loose capitalize text-gray-500">
                    {adoption?.pet.category}
                  </p>
                  <p className="text-md leading-loose capitalize text-gray-500">
                    {adoption?.pet.gender}
                  </p>
                  <p className="text-md leading-loose text-gray-500">
                    {adoption?.pet.age} years old
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-md bg-white p-6">
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
            <div className="border rounded-md bg-white p-6">
              <h1 className="text-2xl font-bold">Address</h1>
              <div className="flex gap-2">
                <p className="text-md text-gray-500">
                  {location.getDivisionName(
                    adoption?.address.division as string
                  )}{" "}
                  {" - "}
                </p>
                <p className="text-md text-gray-500">
                  {location.getDistrictName(
                    adoption?.address.district as string
                  )}{" "}
                  {" - "}
                </p>
                <p className="text-md text-gray-500">
                  {location.getUpazillaName(
                    adoption?.address.upazilla as string
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="border rounded-md bg-white p-6">
        <h1 className="text-2xl font-bold">Description</h1>
        <p className="text-md text-gray-500">{adoption?.pet.description}</p>
      </div>
      <div className="mt-4 bg-white rounded-md p-6">
        <ApplyForm />
      </div>
    </div>
  )
}

export default AdoptionPage
