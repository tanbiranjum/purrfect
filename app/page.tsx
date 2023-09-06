import Categories from "@/components/header/categories"
import Hero from "@/components/home/hero"

import getAdoptionListings from "./actions/get-adoption-listings"
import { IFilterParams } from "./types"
import AdoptionCardContainer from "@/components/adoption-listing/adoption-card-container"

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
      <AdoptionCardContainer adoptions={adoptions}/>
    </>
  )
}
