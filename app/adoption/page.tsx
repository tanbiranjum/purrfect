import React from "react"

import AdoptionCardContainer from "@/components/adoption-listing/adoption-card-container"
import SearchFilter from "@/components/search/search-filter"

import getAdoptionListings from "../actions/get-adoption-listings"

interface AdoptionPageProps {
  searchParams: {
    category?: string
    age?: string
    gender?: string
    lat?: number
    lon?: number
  }
}

const AdoptionPage = async ({ searchParams }: AdoptionPageProps) => {
  const adoptions = await getAdoptionListings(searchParams)

  return (
    <div className="container">
      <SearchFilter />
      <AdoptionCardContainer adoptions={adoptions} />
    </div>
  )
}

export default AdoptionPage
