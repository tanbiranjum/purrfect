import React from "react"

import AdoptionCard from "@/components/adoption-listing/adoption-card"
import SearchFilter from "@/components/search/search-filter"

import getSearchedAdoptions from "../actions/search-adoption"

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
  const adoptions = await getSearchedAdoptions(searchParams)
  console.log(adoptions)

  return (
    <div className="container">
      <SearchFilter />
      <div className="grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
        {adoptions?.map((adoption) => (
          <AdoptionCard key={adoption.id} data={adoption} />
        ))}
      </div>
    </div>
  )
}

export default AdoptionPage
