"use client"

import React from "react"
import { AdoptionRequest } from "@prisma/client"
import axios from "axios"

import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

interface AdoptionRequestListingParams {
  adoptionRequestListings: AdoptionRequest[] | void
}

const AdoptionRequestListing: React.FC<AdoptionRequestListingParams> = ({
  adoptionRequestListings,
}) => {

  const handleConfirmAdoption = async (
    requestId: string,
    adoptionApplicationId: string,
    userId: string

  ) => {
    // 1. Update adoption status to "Adopted"
    // 2. Send email to the applicant
    // 3. Create a new adoption history
    await axios.post("/api/adoption/request/confirm", {
      adoptionRequestId: requestId,
      adoptionApplicationId,
      userId,
    })
  }
  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl font-semibold">Requests</h1>
      {adoptionRequestListings?.length === 0 && (
        <div>No request found!</div>
      )}
      {adoptionRequestListings?.map((request) => (
        <Collapsible>
          <CollapsibleTrigger className="flex w-full gap-6 rounded-t-md bg-white p-4">
            <p className="text-md font-medium leading-loose text-gray-900">
              {request.name}
            </p>
            <p className="text-md font-medium leading-loose text-gray-900">
              {request.message}
            </p>
            <Button
              onClick={() =>
                handleConfirmAdoption(
                  request.id,
                  request.adoptionApplicationId as string,
                  request.applicantId
                )
              }
            >
              Confirm
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-b-md bg-white p-6">
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
                  <p className="text-md font-medium leading-loose text-gray-900">
                    Message
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

export default AdoptionRequestListing
