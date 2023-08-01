import React from "react"
import Image from "next/image"
import Link from "next/link"

export interface PetCardProps {
  pet: {
    id: string
    name: string | null
    imageSrc: string | null
    category: string | null
  }
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <div className="group flex flex-col items-center justify-center rounded-sm pb-4 shadow-sm">
      <Link href={`/pet/${pet.id}`}>
        <Image
          src={pet.imageSrc || ""}
          alt={pet.name || "pet image"}
          className="h-full w-full rounded-sm object-cover transition group-hover:scale-90"
          width={200}
          height={200}
        />
      </Link>
      <div className="mt-2 flex flex-col items-center justify-center">
        <Link href={`/pet/${pet.id}`}>
          <Link
            href={pet.id}
            className="text-xl font-bold text-gray-800 hover:underline"
          >
            {pet.name}
          </Link>
        </Link>
        <span className="text-md text-gray-500">{pet.category}</span>
      </div>
    </div>
  )
}

export default PetCard
