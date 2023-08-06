"use client"

import React from "react"
import { useForm } from "react-hook-form"

import FormDistrictSelect from "../form/form-district-select"
import PetCategorySelect from "../form/pet-category-select"
import { Form } from "../ui/form"

const Search = () => {
  const form = useForm()

  return (
    <div className="flex gap-2 rounded-md">
      <Form {...form}>
        <PetCategorySelect
          form={form}
          name="category"
          placeholder="Select Pet"
          label="Pet"
        />
        <FormDistrictSelect
          form={form}
          name="district"
          label="District"
          divisionId="1"
        />
      </Form>
    </div>
  )
}

export default Search
