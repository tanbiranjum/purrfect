import React from "react"
import Image from "next/image"
import { AdoptionRequest } from "@prisma/client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AdoptionRequestListing from "@/components/adoption-listing/adoption-request-listing"
import CurrentLocation from "@/components/current-location"
import ApplyForm from "@/components/form/apply-form"
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
  let isApplied = false

  if (isOwner) {
    adoptionRequests = await getAdoptionRequest(id)
  } else {
    adoptionRequest = await getAdoptionRequestByUser(user?.id as string, id)
    if (adoptionRequest) isApplied = true
  }
  return (
    <div className="bg-white py-4">
      <div className="max-w-screen-xl mx-auto">
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
            </div>
          </div>
          <div className="col-span-5 md:col-span-3 flex flex-col justify-between">
            {/* LOCATION START */}
            <div className="w-full h-full flex flex-col gap-4">
              <div className="rounded-md border bg-white p-6 h-full">
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
          </div>
        </div>
        {/* START */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pet Info</CardTitle>
            <CardDescription>pet details and categories.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              {/* <BellIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Name</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.pet.name}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 text-accent-foreground transition-all">
              {/* <PersonIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Phone</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.phone}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              {/* <EyeNoneIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.email}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              {/* <EyeNoneIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">About</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.pet.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* END */}
        {/* START */}
        <Card className="mt-3">
          <CardHeader className="pb-3">
            <CardTitle>Applicant</CardTitle>
            <CardDescription>Personal details and application.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              {/* <BellIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Full Name</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.applicant.name}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md hover:bg-accent p-2 text-accent-foreground transition-all">
              {/* <PersonIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Phone</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.phone}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              {/* <EyeNoneIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.email}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              {/* <EyeNoneIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">About</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.pet.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* END */}
        {!adoption?.adopted && (
          <div className="mt-4">
            {!isOwner &&
              (adoptionRequest ? (
                <div className="p-6 bg-white rounded-md">
                  <p>You have applied already</p>
                  <div className="flex items-center gap-2">
                    Status:{" "}
                    {adoptionRequest.accepted ? (
                      <Badge className="bg-green-500">Accepted</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">Pending</Badge>
                    )}
                  </div>
                </div>
              ) : (
                <ApplyForm
                  adoptionId={adoption?.id as string}
                  isApplied={isApplied}
                />
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
