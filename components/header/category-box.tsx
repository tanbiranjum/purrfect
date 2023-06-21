"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"

import { Separator } from "../ui/separator"

interface CategoryBoxProps {
  label: string
  icon: React.ReactNode
  selected: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = () => {
    let currentQuery = {}

    if (params) {
      currentQuery = queryString?.parse(params.toString())
    }

    const newQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get("category") === label) {
      delete newQuery.category
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: newQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }

  return (
    <div
      onClick={handleClick}
      className="flex w-32 cursor-pointer flex-col items-center justify-center p-4"
    >
      {icon}
      <p>{label}</p>
      {selected ? (
        <Separator className="mx-auto mt-2 h-[2px] w-3/5 bg-slate-900" />
      ) : (
        <Separator className="mx-auto mt-2 h-[2px] w-3/5" />
      )}
    </div>
  )
}

export default CategoryBox
