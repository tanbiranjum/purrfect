import React from "react"

import Search from "../search/search"

const Hero = () => {
  return (
    <div className="container flex">
      <div className="flex max-w-2xl flex-col items-start justify-center">
        <h1 className="text-4xl font-bold leading-tight text-gray-900">
          Find your new best friend
        </h1>
        <p className="mt-2 text-xl text-gray-600">
          Browse through our list of pets and find your new best friend.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Search />
      </div>
    </div>
  )
}

export default Hero
