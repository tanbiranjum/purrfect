"use client"

import React, { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import queryString from "query-string"
import { SafeAdoptionListing } from "@/app/types"

// type Props = {}

const useMoreAdoptions = () => {
  const [page, setPage] = useState(2)
  const [moreAdoptions, setMoreAdoptions] = useState<SafeAdoptionListing[]>([])
  const [loading, setLoading] = useState(false)
  const queryString = useSearchParams().toString()

  const fetchMoreAdoptions = async () => {
    setLoading(true)
    const existingQuery = queryString.length > 0 ? queryString + "&" : ""
    const { data } = await axios.get(
      `/api/adoption/?${existingQuery}page=${page}`
    )
    setMoreAdoptions((prev) => prev.concat(JSON.parse(data)))
    setPage((prev) => prev + 1)
    setLoading(false)
  }

  const loadMoreAdoptions = () => {
    fetchMoreAdoptions()
  }

  const fetchMoreAdoptionsMemorized = useMemo(
    () => loadMoreAdoptions,
    [moreAdoptions]
  )

  return {
    moreAdoptions,
    loadMoreAdoptions: fetchMoreAdoptionsMemorized,
    loading
  }
}

export default useMoreAdoptions
