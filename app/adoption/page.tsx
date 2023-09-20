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
    <section className="h-[90vh] mt-10">
      <div className="container grid grid-cols-8 h-full">
        <div className="col-span-2">
          <SearchFilter />
        </div>
        <div className="col-span-6 h-full overflow-y-scroll">
          <AdoptionCardContainer adoptions={adoptions} col={3} />
        </div>
      </div>
    </section>
  )
}

export default AdoptionPage
