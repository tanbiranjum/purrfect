import { Suspense } from "react"

import AdoptionCard from "@/components/adoption-listing/adoption-card"
import Categories from "@/components/header/categories"
import Hero from "@/components/home/hero"
import MoreAdoptions from "@/components/more-adoptions/more-adoptions"
import Skeleton from "@/components/skeleton/skeleton"
import { IFilterParams } from "./types"
import getAdoptionListings from "./actions/get-adoption-listings"


interface IndexPageProps {
  searchParams: IFilterParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const adoptions = await getAdoptionListings(searchParams)
  return (
    <>
      <section>
        <Hero />
      </section>
      <section className="max-w-3xl mx-auto">
        <Categories />
      </section>
      <section className="container pb-8 pt-6 md:py-10">
        {adoptions?.length === 0 && (
          <div className="text-lg">Sorry No Adoption Found!</div>
        )}
        <Suspense fallback={<Skeleton />}>
          <div className="grid grid-cols-5 gap-6">
            {adoptions?.map((adoption) => (
              <AdoptionCard key={adoption.id} data={adoption} />
            ))}
          </div>
        </Suspense>
        <div className="flex justify-center mt-3">
          <MoreAdoptions />
        </div>
      </section>
    </>
  )
}
