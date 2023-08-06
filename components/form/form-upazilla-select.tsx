import React, { useEffect, useState } from "react"
import { Upazilla } from "bd-geojs/dist/data/upazillas"

import { useLocation } from "@/hooks/use-location"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface FormDistrictSelectProps {
  form: any
  name: string
  label: string
  districtId: string
}

const FormUpazillaSelect: React.FC<FormDistrictSelectProps> = ({
  form,
  name,
  label,
  districtId,
}) => {
  const { getUpazillas } = useLocation()
  const [upazilla, setUpazilla] = useState<Upazilla[]>([])

  useEffect(() => {
    setUpazilla(getUpazillas(districtId))
  }, [districtId, getUpazillas])

  const generateUpazilla = () => {
    return upazilla.map((upazilla) => (
      <SelectItem key={upazilla.id} value={upazilla.id}>
        {upazilla.name}
      </SelectItem>
    ))
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{generateUpazilla()}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormUpazillaSelect
