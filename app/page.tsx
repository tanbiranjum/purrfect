import AdoptionCardContainer from "@/components/adoption-listing/adoption-card-container"
import Categories from "@/components/header/categories"
import Hero from "@/components/home/hero"

import getAdoptionListings from "./actions/get-adoption-listings"
import { IFilterParams } from "./types"

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
      <AdoptionCardContainer adoptions={adoptions} />
      {/* CTA ACTION */}
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-8 lg:px-8 bg-white rounded-md">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Transform Lives Through Love.
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
              <img
                alt="Party"
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-16">
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
    </>
  )
}
