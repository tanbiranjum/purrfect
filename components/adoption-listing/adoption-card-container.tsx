"use client"

import React, { Suspense } from "react"
import { Loader2 } from "lucide-react"

import useMoreAdoptions from "@/hooks/use-more-adoptions"
import { SafeAdoptionListing } from "@/app/types"

import Skeleton from "../skeleton/skeleton"
import { Button } from "../ui/button"
import AdoptionCard from "./adoption-card"

type Props = {
  adoptions: SafeAdoptionListing[]
  col?: number
}

const AdoptionCardContainer = ({ adoptions, col }: Props) => {
  const { moreAdoptions, loadMoreAdoptions, loading } = useMoreAdoptions()

  return (
    <section className="container pb-8">
      {adoptions?.length === 0 && (
        <div className="text-lg">Sorry No Adoption Found!</div>
      )}
      <Suspense fallback={<Skeleton />}>
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
          {adoptions?.map((adoption) => (
            <AdoptionCard key={adoption.id} data={adoption} />
          ))}
          {moreAdoptions?.map((adoption) => (
            <AdoptionCard key={adoption.id} data={adoption} />
          ))}
        </div>
      </Suspense>
      <div className="mt-3 flex justify-center">
        <Button onClick={loadMoreAdoptions} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Load More
        </Button>
      </div>
    </section>
  )
}

export default AdoptionCardContainer
