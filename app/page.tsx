import PetCard from "@/components/pet-listing/pet-card"

import getPetListing, { PetListingParams } from "./actions/get-pet-listing"

interface IndexPageProps {
  searchParams: PetListingParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const pets = await getPetListing(searchParams)
  console.log(pets)
  return (
    <section className="container grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
      {pets?.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </section>
  )
}
