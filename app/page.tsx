import PetCard from "@/components/adoption-listing/adoption-card"

import getAdoptionListing, {
  AdoptionListingParams,
} from "./actions/get-adoption-listing"

interface IndexPageProps {
  searchParams: AdoptionListingParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const pets = await getAdoptionListing(searchParams)
  console.log(pets)
  return (
    <section className="container grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
      {pets?.map((pet) => (
        <PetCard key={pet.id} data={pet} />
      ))}
    </section>
  )
}
