"use client"

import React, { MouseEvent, useEffect, useState } from "react"

import Map from "../map/map"
import { Input } from "../ui/input"

type Props = {
  includeMap?: boolean
}

const BASE_URL = "https://nominatim.openstreetmap.org/search?"

const Address = ({ includeMap }: Props) => {
  const [searchText, setSearchText] = useState("")
  const [location, setLocation] = useState([51.505, -0.09])
  const [addresses, setAddresses] = useState([])
  const [suggestionDisplay, setSuggestionDisplay] = useState(false)

  useEffect(() => {
    const getLocation = setTimeout(() => {
      const params = {
        q: searchText,
        format: "json",
        addressdetails: "1",
        polygon_geojson: "0",
      }

      const queryString = new URLSearchParams(params).toString()

      fetch(`${BASE_URL}${queryString}`)
        .then((response) => response.text())
        .then((result) => {
          setAddresses(JSON.parse(result))
          setSuggestionDisplay(true)
        })
    }, 2000)

    return () => clearTimeout(getLocation)
  }, [searchText])

  const handleAddressSelect = (address: any) => {
    setLocation([address.lat, address.lon])
    setSuggestionDisplay(false)
  }

  return (
    <div>
      <div className="relative">
        <Input
          placeholder="Enter your address here"
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        {suggestionDisplay && (
          <div className="absolute left-0 top-full z-50 rounded-lg">
            {addresses?.map((address: any) => (
              <div
                className="w-full cursor-pointer border bg-white p-2"
                onClick={() => handleAddressSelect(address)}
              >
                <p>{address.display_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6">
        <Map location={location} />
      </div>
    </div>
  )
}

export default Address
