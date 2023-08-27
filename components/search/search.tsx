"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Address from "../address/address"
import PetCategorySelect from "../form/pet-category-select"
import { Button } from "../ui/button"
import { Form } from "../ui/form"

const SearchSchema = z.object({
  category: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
})

const Search = ({ modal }: { modal?: any }) => {
  const [validAddress, setValidAddress] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      category: "",
      address: "",
      lat: 0,
      lon: 0,
    }
  })

  const searchText = form.watch("address")

  const onSubmit = (values: z.infer<typeof SearchSchema>) => {
    // build a query string
    let query = ""
    if (values.category) {
      query += `category=${values.category}`
    }
    if (values.lat) {
      query += `&lat=${values.lat}`
    }
    if (values.lon) {
      query += `&lon=${values.lon}`
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
          <Address
            includeMap={false}
            form={form}
            name="address"
            placeholder="Where you want to search?"
            label="Location"
            searchText={searchText}
            validAddress={setValidAddress}
          />
          <Button type="submit" disabled={!validAddress}>Search</Button>
        </form>
      </Form>
    </div>
  )
}

export default Search
