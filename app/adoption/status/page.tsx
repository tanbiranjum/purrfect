import React, { useContext } from "react"

import PetCard from "@/components/adoption-listing/adoption-card"
import getPetListing from "@/app/actions/get-adoption-listing"
import getCurrentUser from "@/app/actions/get-current-user"

const getNotAdoptedPets = (pets: any) => {
  return pets.filter((pet: any) => pet.adopted === false)
}

const getAdoptedPets = (pets: any) => {
  return pets.filter((pet: any) => pet.adopted === true)
}

const AdoptionStatusPage = async () => {
  const currentUser = await getCurrentUser()
  const adoption = await getPetListing({ ownerId: currentUser?.id })
  return (
    <div className="container">
      <p className="text-2xl">Pet waiting for get adopted</p>
      <div className="grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
        {getNotAdoptedPets(adoption)?.map((pet: any) => (
          <PetCard key={pet.id} pet={pet} actionButton={true} />
        ))}
      </div>
    </div>
  )
}

export default AdoptionStatusPage
