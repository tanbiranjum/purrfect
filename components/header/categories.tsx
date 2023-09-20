"use client"

import React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Slider, { Settings } from "react-slick"

import { Icons } from "../icons"
import CategoryBox from "./category-box"
import { Cat, Dog, Egg } from "lucide-react"

export const categories = [
  {
    icon: <Cat/>,
    label: "Find cat",
    name: "cat",
    description: "Cute kitty cat",
  },
  {
    icon: <Dog/>,
    label: "Find dog",
    name: "dog",
    description: "Your best friend and companion",
  },
  {
    icon: <Icons.rabbit/>,
    label: "Find rabbit",
    name: "rabbit",
    description: "Forest starts here",
  },
  {
    icon: <Icons.bird height="25"/>,
    label: "Find bird",
    name: "bird",
    description: "Forest starts here",
  },
  {
    icon: <Egg/>,
    label: "others",
    name: "others",
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className="mb-6">
      <div className="py-6">
        <Slider {...settings}>
          {categories.map((item, i) => (
            <CategoryBox
              key={i}
              name={item.name}
              label={item.label}
              icon={item.icon}
              selected={category === item.name}
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Categories
