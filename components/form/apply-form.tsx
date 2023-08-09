"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../ui/button"
import { Form } from "../ui/form"
import FormLocationSelect from "./location-input/form-location-select"
import PetCategorySelect from "./pet-category-select"

const SearchSchema = z.object({
  category: z.string().min(1).max(255),
  division: z.string().optional(),
  district: z.string().optional(),
  upazilla: z.string().optional(),
})

const ApplyForm = () => {
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
  })

  const onSubmit = (values: z.infer<typeof SearchSchema>) => {}
  return (
    <div className="flex gap-2 rounded-md ">
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormLocationSelect form={form} />
          <Button type="submit" className="text-2xl mt-4 p-8">
            Apply to Adopt
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ApplyForm
