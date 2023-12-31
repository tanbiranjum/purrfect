"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useLocation } from "@/hooks/use-location"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import AddressNew from "../address/address-new"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

type Props = {}

const SearchFilter = (props: Props) => {
  const router = useRouter()
  const [query, setQuery] = useState({
    category: "",
    gender: "",
    age: "",
    lat: -1,
    lon: -1,
  })
  const location = useLocation()

  useEffect(() => {
    if (location.location.lat > -1 && location.location.lon > -1) {
      setQuery({
        ...query,
        lat: location.location.lat * 1,
        lon: location.location.lon * 1,
      })
    }
  }, [location.location.lat, location.location.lon])

  const handleSearch = () => {
    const searchQuery: {
      category?: string
      age?: string
      gender?: string
      lat?: string
      lon?: string
    } = {}

    if (query.category) {
      searchQuery.category = query.category
    }
    if (query.gender) {
      searchQuery.gender = query.gender
    }
    if (query.age) {
      searchQuery.age = query.age
    }
    if (query.lat !== -1) {
      searchQuery.lat = query.lat.toString()
    }
    if (query.lon !== -1) {
      searchQuery.lon = query.lon.toString()
    }

    const queryString = new URLSearchParams(searchQuery).toString()
    router.push(`/adoption?${queryString}`)
  }

  const handleReset = () => {
    setQuery({
      category: "",
      gender: "",
      age: "",
      lat: -1,
      lon: -1,
    })
  }

  return (
    <div className="h-[90vh]">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <Select
            onValueChange={(value) => {
              setQuery({ ...query, category: value })
            }}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Select species" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Species</SelectLabel>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="bird">Bird</SelectItem>
                <SelectItem value="rabbit">Rabbit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setQuery({ ...query, gender: value })
            }}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setQuery({ ...query, age: value })
            }}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Age</SelectLabel>
                <SelectItem value="0-1">0 - 1</SelectItem>
                <SelectItem value="1-3">1 - 3</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <AddressNew {...location} className="h-10 w-full" />
        </CardContent>
        <CardFooter className="gap-4">
          <Button className="h-full" onClick={handleReset}>
            Reset
          </Button>
          <Button className="h-full w-full" onClick={handleSearch}>
            Search
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SearchFilter
