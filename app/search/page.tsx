import React from "react"

import AdoptionCard from "@/components/adoption-listing/adoption-card"
import getAdoptionListings from "../actions/get-adoption-listings"

interface SearchPageParams {
  searchParams: {
    category: string
    lat: number
    lon: number
  }
}

const SearchPage = async ({ searchParams }: SearchPageParams) => {
  const adoptions = await getAdoptionListings(searchParams)
  
  return (
    <div className="container">
      <h1 className="py-8 text-center text-2xl font-bold">Search Results</h1>
      <div className="grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
        {adoptions?.map((adoption) => (
          <AdoptionCard key={adoption.id} data={adoption} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
