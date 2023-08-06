import React from "react"

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
      className="flex min-h-[60vh] items-center bg-cover"
    >
      <div className="container">
        <div className="">
          <h1 className="text-6xl font-bold leading-tight text-white">
            Find your new best friend
          </h1>
          <p className="mt-2 text-xl text-gray-200">
            Browse through our list of pets and find your new best friend.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
