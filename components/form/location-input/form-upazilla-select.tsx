import React, { useEffect, useState } from "react"
import { Upazilla } from "bd-geojs/dist/data/upazillas"

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
import { FetchLocation } from "@/lib/fetch-location"

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
  const location = new FetchLocation()
  const [upazilla, setUpazilla] = useState<Upazilla[]>([])

  useEffect(() => {
    setUpazilla(location.getUpazillas(districtId))
  }, [districtId])

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
        <FormItem className="w-40">
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