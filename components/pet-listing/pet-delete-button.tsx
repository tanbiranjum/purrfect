"use client"

import React from "react"

import { Icons } from "../icons"

const PetDeleteButton = () => {
  return (
    <div className="cursor-pointer">
      <Icons.delete color="red" size="24"/>
    </div>
  )
}

export default PetDeleteButton
