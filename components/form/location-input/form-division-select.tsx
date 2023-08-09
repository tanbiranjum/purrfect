import React from "react"

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

interface FormDivisionSelectProps {
  form: any
  name: string
  label: string
  divisionId: string
  setDivisionId?: (divisionId: string) => void
}

const FormDivisionSelect: React.FC<FormDivisionSelectProps> = ({
  form,
  name,
  label,
  divisionId,
  setDivisionId = () => {},
}) => {
  const location = new FetchLocation()
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
              setDivisionId(value)
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {location.getDivisions().map((division) => (
                <SelectItem
                  className="text-black"
                  key={division.id}
                  value={division.id}
                >
                  {division.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormDivisionSelect
