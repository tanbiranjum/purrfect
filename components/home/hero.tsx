import React from "react"
import Image from "next/image"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <section className="h-[90vh] dark:bg-gray-800 dark:text-gray-100">
      <div className="container mx-auto flex h-full flex-col items-center justify-center p-6 text-center sm:py-6 lg:py-10">
        <Badge variant="secondary" className="my-3 px-3 py-1 text-sm">Follow us on Twitter</Badge>
        <h1 className="mx-auto max-w-5xl text-3xl font-bold sm:text-7xl md:text-4xl lg:text-6xl">
          Find your pet the safe house you always wanted.
        </h1>
        <p className="mb-8 mt-6 text-xl text-slate-600 sm:mb-12">
          A little love is all they need. Adopt your best friend.{" "}
          <br className="hidden md:inline lg:hidden" />
          They need your loving care.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-center">
          <Button>Get Started</Button>
          <Button variant="outline" className="dark:border-white">Contact Now</Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
