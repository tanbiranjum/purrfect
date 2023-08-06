"use client"

import React from "react"
import { useForm } from "react-hook-form"

import FormLocationSelect from "../form/location-input/form-location-select"
import PetCategorySelect from "../form/pet-category-select"
import { Button } from "../ui/button"
import { Form } from "../ui/form"

const Search = () => {
  const form = useForm()

  return (
    <div className="flex gap-2 rounded-md bg-white">
      <Form {...form}>
        <form className="flex items-end gap-3">
          <PetCategorySelect
            form={form}
            name="category"
            placeholder="Select Pet"
            label="Pet"
          />
          <FormLocationSelect form={form} />
          <Button type="submit">Search</Button>
        </form>
      </Form>
    </div>
  )
}

export default Search
