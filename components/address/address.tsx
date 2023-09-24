"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

import ClientOnly from "../client-only"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

type Props = {
  form?: any
  includeMap?: boolean
  name: string
  label?: string
  placeholder: string
  searchText: string
  validAddress?: React.Dispatch<React.SetStateAction<boolean>>
}

const BASE_URL = "https://nominatim.openstreetmap.org/search?"
const DynamicMap = dynamic(() => import("../map/map"), { ssr: false })

const Address = ({
  form,
  includeMap,
  name,
  label,
  placeholder,
  searchText,
  validAddress,
}: Props) => {
  const [location, setLocation] = useState([51.505, -0.09])
  const [addresses, setAddresses] = useState([])
  const [suggestionDisplay, setSuggestionDisplay] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState({
    address: searchText,
    lat: -1,
    lon: -1,
  })
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    // check if the address valid
    if (selectedAddress.lat === -1 && selectedAddress.lon === -1) {
      validAddress && validAddress(false)
    } else {
      validAddress && validAddress(true)
    }
    const getLocation = setTimeout(() => {
      if (searchText !== selectedAddress.address) {
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
            setSelected(false)
            setSuggestionDisplay(true)
          })
      }
    }, 2000)

    return () => clearTimeout(getLocation)
  }, [searchText])

  const handleAddressSelect = (address: any) => {
    setSelected(true)
    setSelectedAddress({
      address: address.display_name,
      lat: address.lat * 1,
      lon: address.lon * 1,
    })
    form.setValue("address", address.display_name)
    form.setValue("lat", address.lat * 1)
    form.setValue("lon", address.lon * 1)
    setLocation([address.lat, address.lon])
    setSuggestionDisplay(false)
  }

  return (
    <div>
      <div className="relative">
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
          <ClientOnly>
            <DynamicMap location={location} />
          </ClientOnly>
        </div>
      )}
    </div>
  )
}

export default Address
