import React from "react"
import Image from "next/image"
import { AdoptionRequest } from "@prisma/client"

import { ageFormat, captilizeWord } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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
    <div className="py-4">
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
            <Card className="mt-3">
              <CardHeader className="pb-3">
                <CardTitle>Location</CardTitle>
                <CardDescription>{adoption?.address.address}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-1">
                <CurrentLocation
                  lat={adoption?.address.lat}
                  lon={adoption?.address.lon}
                />
              </CardContent>
            </Card>
            {/* LOCATION END */}
          </div>
        </div>
        {/* START */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pet Info</CardTitle>
            <CardDescription>Pet details and categories.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Name</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.pet.name}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 text-accent-foreground transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Category</p>
                <p className="text-sm text-muted-foreground">
                  {captilizeWord(adoption?.pet.category as string)}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Age</p>
                <p className="text-sm text-muted-foreground">
                  {ageFormat(adoption?.pet.age as number)}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Full Name</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.applicant.name}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md hover:bg-accent p-2 text-accent-foreground transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Phone</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.phone}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">
                  {adoption?.email}
                </p>
              </div>
            </div>
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
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
                <div className="p-6 rounded-lg border">
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
