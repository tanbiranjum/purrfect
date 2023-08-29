import React from "react"
import SearchFilter from "@/components/search/search-filter"
import getSearchedAdoptions from "../actions/search-adoption"

interface AdoptionPageProps {
  searchParams: {
    category?: string,
    age?: string,
    gender?: string,
    lat?: number,
    lon?: number
  }
}

const AdoptionPage = async ({ searchParams }: AdoptionPageProps) => {
  const adoptions = await getSearchedAdoptions(searchParams)
  console.log(adoptions)
  
  return (
    <div className="mx-auto max-w-screen-lg">
        <SearchFilter/>
    </div>
  )
}

export default AdoptionPage
