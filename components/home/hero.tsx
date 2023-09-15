import React from "react"
import Image from "next/image"

import { Button } from "../ui/button"

const Hero = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-6 lg:py-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-relaxed sm:text-6xl">
            Purrfect {" "}
            <span className="dark:text-violet-400">Adoption</span> Today
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
          A little love is all they need. Adopt your best friend. {" "}
            <br className="hidden md:inline lg:hidden" />
            They need your loving care. 
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Button>Get Started</Button>
            <Button variant="outline">Contact Now</Button>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Image
            src="images/welcome_cat.svg"
            alt="welcome cats"
            height={600}
            width={600}
            // className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
