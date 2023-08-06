import PetCard from "@/components/adoption-listing/adoption-card"
import Hero from "@/components/home/hero"

import getAdoptionListing, {
  AdoptionListingParams,
} from "./actions/get-adoption-listing"

interface IndexPageProps {
  searchParams: AdoptionListingParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const adoptions = await getAdoptionListing(searchParams)
  console.log(adoptions)
  return (
    <>
      <section className="container grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
        {adoptions?.map((adoption) => (
          <PetCard key={adoption.id} data={adoption} />
        ))}
      </section>
      <section>
        <Hero />
      </section>
    </>
  )
}
