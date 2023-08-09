import PetCard from "@/components/adoption-listing/adoption-card"
import Hero from "@/components/home/hero"

import getAdoptionListings, {
  AdoptionListingParams,
} from "./actions/get-adoption-listings"

interface IndexPageProps {
  searchParams: AdoptionListingParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const adoptions = await getAdoptionListings(searchParams)
  return (
    <>
      <section>
        <Hero />
      </section>
      <section className="container grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
        {adoptions?.map((adoption) => (
          <PetCard key={adoption.id} data={adoption} />
        ))}
      </section>
    </>
  )
}
