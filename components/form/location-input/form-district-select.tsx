/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState } from "react"
import { District } from "bd-geojs/dist/data/districts"

import { useLocation } from "@/hooks/use-location"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"

interface FormDistrictSelectProps {
  form: any
  name: string
  label: string
  divisionId: string
  setDistrictId?: (districtId: string) => void
}

const FormDistrictSelect: React.FC<FormDistrictSelectProps> = ({
  form,
  name,
  label,
  divisionId,
  setDistrictId = () => {},
}) => {
  const { getDistricts } = useLocation()

  const [districts, setDistricts] = useState<District[]>([])

  const GenerateDistrict = () => {
    return districts.map((district) => (
      <SelectItem key={district.id} value={district.id}>
        {district.name}
      </SelectItem>
    ))
  }

  useEffect(() => {
    setDistricts(getDistricts(divisionId))
  }, [divisionId])
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-40">
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value)
              setDistrictId(value)
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <GenerateDistrict />
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormDistrictSelect
