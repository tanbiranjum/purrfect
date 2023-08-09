"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import FormLocationSelect from "../form/location-input/form-location-select"
import PetCategorySelect from "../form/pet-category-select"
import { Button } from "../ui/button"
import { Form } from "../ui/form"

const SearchSchema = z.object({
  category: z.string().min(1).max(255),
  division: z.string().optional(),
  district: z.string().optional(),
  upazilla: z.string().optional(),
})

const Search = ({ modal }: { modal?: any }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
  })

  const onSubmit = (values: z.infer<typeof SearchSchema>) => {
    // build a query string
    let query = ""
    if (values.category) {
      query += `category=${values.category}`
    }
    if (values.division) {
      query += `&division=${values.division}`
    }
    if (values.district) {
      query += `&district=${values.district}`
    }
    if (values.upazilla) {
      query += `&upazilla=${values.upazilla}`
    }

    if (modal && modal.isOpen) {
      modal.close()
    }
    router.push(`/search?${query}`)
  }

  return (
    <div className="flex gap-2 rounded-md ">
      <Form {...form}>
        <form
          className="flex items-end gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
