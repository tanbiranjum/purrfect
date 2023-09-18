"use client"

import React, { SetStateAction, useEffect, useState } from "react"

import Map from "../map/map"
import { Input } from "../ui/input"

type Props = {
  includeMap?: boolean
  location: {
    lat: number
    lon: number
  }
  setLocation: React.Dispatch<
    SetStateAction<{
      lat: number
      lon: number
    }>
  >
  address: string
  setAddress: React.Dispatch<SetStateAction<string>>
  className?: string
}

const BASE_URL = "https://nominatim.openstreetmap.org/search?"

const AddressNew = ({
  includeMap,
  location,
  setLocation,
  address,
  setAddress,
  className
}: Props) => {
  const [addresses, setAddresses] = useState([])
  const [suggestionDisplay, setSuggestionDisplay] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState('')
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const getLocation = setTimeout(() => {
      if (address !== selectedAddress) {
        const params = {
          q: address,
          format: "json",
          addressdetails: "1",
          polygon_geojson: "0",
        }

        const queryString = new URLSearchParams(params).toString()

        fetch(`${BASE_URL}${queryString}`)
          .then((response) => response.text())
          .then((result) => {
            setAddresses(JSON.parse(result))
            setSelected(false)
            setSuggestionDisplay(true)
          })
      }
    }, 2000)

    return () => clearTimeout(getLocation)
  }, [address])

  const handleAddressSelect = (address: any) => {
    setSelected(true)
    setSelectedAddress(address.display_name)
    setAddress(address.display_name)
    setLocation({
      lat: address.lat * 1,
      lon: address.lon * 1,
    })
    setSuggestionDisplay(false)
  }

  return (
    <div>
      <div className="relative">
        <Input
        // TODO: remove the constant className style 
          className={`w-56 h-14 ${className}`}
          placeholder="Search location"
          autoComplete="off"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value)
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
      {includeMap && (
        <div className="mt-6">
          <Map location={[location.lat, location.lon]} />
        </div>
      )}
    </div>
  )
}

export default AddressNew
