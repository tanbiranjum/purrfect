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
}

const AdoptionCardContainer = ({ adoptions }: Props) => {
  const { moreAdoptions, loadMoreAdoptions, loading } = useMoreAdoptions()

  return (
    <section className="container pb-8">
      {adoptions?.length === 0 && (
        <div className="text-lg">Sorry No Adoption Found!</div>
      )}
      <Suspense fallback={<Skeleton />}>
        <div className="grid grid-cols-5 md:grid-cols-4 gap-6">
          {adoptions?.map((adoption) => (
            <AdoptionCard key={adoption.id} data={adoption} />
          ))}
          {moreAdoptions?.map((adoption) => (
            <AdoptionCard key={adoption.id} data={adoption} />
          ))}
        </div>
      </Suspense>
      <div className="flex justify-center mt-3">
        <Button onClick={loadMoreAdoptions} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Load More
        </Button>
      </div>
    </section>
  )
}

export default AdoptionCardContainer
