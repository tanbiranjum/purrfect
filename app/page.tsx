import { AspectRatio } from "@/components/ui/aspect-ratio"
import AdoptionCardContainer from "@/components/adoption-listing/adoption-card-container"
import Categories from "@/components/header/categories"
import Hero from "@/components/home/hero"

import getAdoptionListings from "./actions/get-adoption-listings"
import { IFilterParams } from "./types"
import Image from "next/image"

interface IndexPageProps {
  searchParams: IFilterParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const adoptions = await getAdoptionListings(searchParams)
  return (
    <div className="pb-8">
      <section>
        <Hero />
      </section>
      <section className="max-w-3xl mx-auto">
        <Categories />
      </section>
      <AdoptionCardContainer adoptions={adoptions}/>
      {/* CTA ACTION */}
      <section className="container">
        <div className="px-4 py-16 sm:px-6 sm:py-8 lg:px-8 bg-white rounded-md">
          <div className="mt-8 grid grid-cols-5 gap-12">
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full col-span-5 lg:col-span-2">
              <AspectRatio ratio={4 / 3}>
                <Image
                  fill
                  alt="Party"
                  src="https://images.unsplash.com/photo-1620379876467-b77f993b3674?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  className="absolute inset-0 h-full w-full object-cover rounded-md"
                />
              </AspectRatio>
            </div>

            <div className="col-span-5 lg:col-span-3">
              <h2 className="text-3xl font-bold sm:text-4xl pb-3">
                Transform Lives Through Love.
              </h2>
              <article className="space-y-4 text-gray-600">
                <p>
                  Choosing to adopt a pet is an act of compassion that not only
                  changes their life but also enriches your own. Every adopted
                  pet has a unique story—a tale of hope, resilience, and second
                  chances. By opening your heart and home to adoption, you
                  provide a loving sanctuary to a pet who may have faced
                  hardship or abandonment.
                </p>
                <p>
                  The bond between an adoptive family and their pet is
                  unparalleled. It's a relationship built on trust, loyalty, and
                  shared experiences. Pets bring joy, comfort, and a sense of
                  purpose to our lives. They teach us valuable life lessons, and
                  their presence adds immeasurable happiness to our daily
                  routines. So, why choose adoption? Because it's a chance to
                  make a profound difference. By adopting, you become part of a
                  compassionate community that values kindness and empathy. You
                  get to witness the incredible transformation of a shelter pet
                  into a cherished family member. You have the opportunity to
                  save a soul and bring happiness to a life in need.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* CTA ACTION END */}
    </div>
  )
}
