import React, { useContext } from "react"

import PetCard from "@/components/adoption-listing/adoption-card"
import getAdoptionListing from "@/app/actions/get-adoption-listing"
import getCurrentUser from "@/app/actions/get-current-user"
import { SafeAdoptionListing } from "@/app/types"

const getNotAdoptedPets = (adoptions: any) => {
  return adoptions.filter((adoption: any) => adoption.adopted === false)
}

const getAdoptedPets = (adoptions: any) => {
  return adoptions.filter((adoption: any) => adoption.adopted === true)
}

const AdoptionStatusPage = async () => {
  const currentUser = await getCurrentUser()
  const adoptions = await getAdoptionListing({
    ownerId: currentUser?.id,
  })
  return (
    <div className="container">
      <p className="text-2xl">Pet waiting for get adopted</p>
      <div className="grid grid-cols-5 gap-6 pb-8 pt-6 md:py-10">
        {getNotAdoptedPets(adoptions)?.map((adoption: SafeAdoptionListing) => (
          <PetCard key={adoption.id} data={adoption} actionButton={true} />
        ))}
      </div>
    </div>
  )
}

export default AdoptionStatusPage
