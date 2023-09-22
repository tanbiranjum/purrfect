"use client"

import React from "react"
import { AdoptionRequest } from "@prisma/client"
import axios from "axios"
import { columns } from "./table/column"
import { DataTable } from "./table/data-table"

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

  const requestListings = adoptionRequestListings?.map((request) => {
    return {
      id: request.id,
      name: request.name,
      email: request.email,
      phone: request.phone,
      status: request.accepted,
      message: request.message,
      userId: request.applicantId,
      adoptionApplicationId: request.adoptionApplicationId || null
    }
  })

  return (
    <div className="bg-white p-6 rounded-md">
      <h1 className="text-2xl font-semibold">Requests</h1>
      {adoptionRequestListings?.length === 0 && <div>No request found!</div>}
      <div className="mt-2">
        <DataTable columns={columns} data={requestListings || []}/>
      </div>
    </div>
  )
}

export default AdoptionRequestListing
