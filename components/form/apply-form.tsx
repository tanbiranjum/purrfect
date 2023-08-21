/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../ui/button"
import { Form } from "../ui/form"
import FormInput from "./form-input"
import FormLocationSelect from "./location-input/form-location-select"

const ApplyAdoptionSchema = z.object({
  name: z.string().min(1).max(255),
  phone: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  message: z.string().min(1).max(255),
  division: z.string().optional(),
  district: z.string().optional(),
  upazilla: z.string().optional(),
})

const ApplyForm = ({ adoptionId }: { adoptionId: string }) => {
  const [applied, setApplied] = React.useState(false)
  const form = useForm<z.infer<typeof ApplyAdoptionSchema>>({
    resolver: zodResolver(ApplyAdoptionSchema),
  })

  const handleCheck = async () => {
    const { data } = await axios.get(`/api/adoption/request/${adoptionId}`)
    console.log(data)
    if (data.message === "success") {
      setApplied(true)
    }
  }

  useEffect(() => {
    handleCheck()
  }, [])

  const onSubmit = async (values: z.infer<typeof ApplyAdoptionSchema>) => {
    const { data } = await axios.post("/api/adoption/request", {
      ...values,
      adoptionId,
    })
    console.log(data)
  }
  return (
    <div className="flex gap-2 rounded-md ">
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            form={form}
            name="name"
            label="Your name"
            placeholder="name"
          />
          <FormInput
            form={form}
            name="phone"
            label="Phone number"
            placeholder="phone number"
          />
          <FormInput
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="name"
          />
          <FormInput
            form={form}
            name="message"
            label="Message"
            placeholder="message to owner"
          />
          <FormLocationSelect form={form} />
          {applied ? (
            <p className="text-xl">You have already applied!</p>
          ) : (
            <Button
              type="submit"
              disabled={applied}
              className="mt-4 p-6 text-xl"
            >
              Apply to Adopt
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}

export default ApplyForm
