"use client"

import React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Slider, { Settings } from "react-slick"

import { Icons } from "../icons"
import CategoryBox from "./category-box"

export const categories = [
  {
    icon: <Icons.cat />,
    label: "Find cat",
    description: "Cute kitty cat",
  },
  {
    icon: <Icons.dog />,
    label: "Find dog",
    description: "Your best friend and companion",
  },
  {
    icon: <Icons.rabbit />,
    label: "Find rabbit",
    description: "Forest starts here",
  },
  {
    icon: <Icons.bird height="25"/>,
    label: "Find bird",
    description: "Forest starts here",
  },
  {
    icon: <Icons.egg />,
    label: "others",
    description: "Tent starts here",
  },
]

interface ArrowProps {
  className?: string
  onClick?: () => void
}

const PreviousArrow = ({ className, onClick }: ArrowProps) => {
  return (
    <div style={{ display: "none" }} className={className} onClick={onClick}>
      <Icons.leftArrow />
    </div>
  )
}

const NextArrow = ({ className, onClick }: ArrowProps) => {
  return (
    <div
      className={className}
      style={{ color: "black", top: "16%" }}
      onClick={onClick}
    >
      <Icons.rightArrow />
    </div>
  )
}

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === "/"

  if (!isMainPage) {
    return null
  }

  const settings: Settings = {
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  }

  return (
    <div>
      <div className="container">
        <Slider {...settings}>
          {categories.map((item, i) => (
            <CategoryBox
              key={i}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Categories
