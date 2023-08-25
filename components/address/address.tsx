"use client"

import React, { useEffect, useState } from "react"

import Map from "../map/map"
import { Button } from "../ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

type Props = {
  form: any
  includeMap?: boolean
  name: string
  label: string
  placeholder: string
  searchText: string
}

const BASE_URL = "https://nominatim.openstreetmap.org/search?"

const Address = ({
  form,
  includeMap,
  name,
  label,
  placeholder,
  searchText,
}: Props) => {
  const [location, setLocation] = useState([51.505, -0.09])
  const [addresses, setAddresses] = useState([])
  const [suggestionDisplay, setSuggestionDisplay] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(searchText || "")
  const [isSelected, setIsSelected] = useState(searchText !== "")

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
    setIsSelected(true)
    setSelectedAddress(address.display_name)
    form.setValue("address", address.display_name)
    form.setValue("lat", address.lat * 1)
    form.setValue("lon", address.lon * 1)
    setLocation([address.lat, address.lon])
    setSuggestionDisplay(false)
  }

  return (
    <div>
      <div className="relative">
        {!isSelected ? (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            <div className="rounded-sm border bg-slate-300 p-2">
              <p>{selectedAddress}</p>
            </div>
            <Button className="mt-2" onClick={() => setIsSelected(false)}>
              Reset
            </Button>
          </>
        )}
        {suggestionDisplay && !isSelected && (
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
      <div className="mt-6">{includeMap && <Map location={location} />}</div>
    </div>
  )
}

export default Address
