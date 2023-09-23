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
    <section className="mt-10 h-[90vh]">
      <div className="container grid h-full grid-cols-8">
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
