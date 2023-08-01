import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

import getPetListing from "./actions/get-pet-listing"

interface IndexPageProps {
  searchParams: {
    category: string
  }
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const pets = await getPetListing(searchParams)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {pets?.map((pet) => (
        <div key={pet.id} className="flex flex-col items-center justify-center">
          <Link href={`/pet/${pet.id}`}>
            <Image
              src={pet.imageSrc || ""}
              alt={pet.name || "pet image"}
              className="h-32 w-32 rounded-full"
              width={128}
              height={128}
            />
          </Link>
          <div className="mt-2 flex flex-col items-center justify-center">
            <Link href={`/pet/${pet.id}`}>
              <Link
                href={pet.id}
                className="text-sm font-medium text-gray-800 hover:underline"
              >
                {pet.name}
              </Link>
            </Link>
            <span className="text-xs text-gray-500">{pet.category}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
