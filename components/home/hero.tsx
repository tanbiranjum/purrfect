import React from "react"
import Image from "next/image"

const Hero = () => {
  return (
    <div
    >
      <div className="relative">
        <Image
          src="/images/hero-bg.png"
          width="1600"
          height="400"
          alt="background hero"
        />
        <p className="absolute bottom-12 left-[32%] text-6xl font-semibold">Purrfect Adoption</p>
      </div>
    </div>
  )
}

export default Hero
