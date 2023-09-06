import React from "react"

import AdoptionCard from "@/components/adoption-listing/adoption-card"
import MoreAdoptions from "@/components/more-adoptions/more-adoptions"
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
      <div className="grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
        {adoptions?.map((adoption) => (
          <AdoptionCard key={adoption.id} data={adoption} />
        ))}
      </div>
      <div>
        <MoreAdoptions />
      </div>
    </div>
  )
}

export default AdoptionPage
