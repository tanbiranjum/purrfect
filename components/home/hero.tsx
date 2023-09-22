import React from "react"
import Image from "next/image"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100 h-[90vh]">
      <div className="container flex flex-col justify-center items-center h-full text-center p-6 mx-auto sm:py-6 lg:py-10">
        <Badge variant="secondary" className="px-3 py-1 my-3 text-sm">Follow us on Twitter</Badge>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold sm:text-7xl max-w-5xl mx-auto">
          Find your pet the safe house you always wanted.
        </h1>
        <p className="mt-6 mb-8 text-xl sm:mb-12 text-slate-600">
          A little love is all they need. Adopt your best friend.{" "}
          <br className="hidden md:inline lg:hidden" />
          They need your loving care.
        </p>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center">
          <Button>Get Started</Button>
          <Button variant="outline" className="dark:border-white">Contact Now</Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
