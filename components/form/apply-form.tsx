/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useLocation } from "@/hooks/use-location"

import AddressNew from "../address/address-new"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Textarea } from "../ui/textarea"
import FormInput from "./form-input"

const ApplyAdoptionSchema = z.object({
  name: z.string().min(1).max(255),
  phone: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  message: z.string().min(1).max(255),
})

const ApplyForm = ({ adoptionId, isApplied }: { adoptionId: string, isApplied: boolean }) => {
  const formLocation = useLocation()
  const [applied, setApplied] = useState(isApplied)
  const form = useForm<z.infer<typeof ApplyAdoptionSchema>>({
    resolver: zodResolver(ApplyAdoptionSchema),
  })

  const onSubmit = async (values: z.infer<typeof ApplyAdoptionSchema>) => {
    const { data } = await axios.post("/api/adoption/request", {
      ...values,
      adoptionId,
      address: formLocation,
    })

    if (JSON.parse(data).message === "success") {
      setApplied(true)
    }
  }

  return (
    <div className="flex flex-col-reverse gap-8 rounded-md bg-white p-6 border">
      {applied ? (
        <p className="text-xl">You have already applied!</p>
      ) : (
        <Form {...form}>
          <form
            className="flex flex-col gap-3 max-w-2xl"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              form={form}
              name="name"
              label="Your name"
              placeholder="name"
            />
            <div className="grid grid-cols-2 gap-6 w-full">
              <FormInput
                form={form}
                name="phone"
                label="Phone number"
                placeholder="phone number"
                className="col-span-1"
              />
              <FormInput
                form={form}
                name="email"
                label="Email"
                type="email"
                placeholder="john@mail.com"
                className="col-span-1"
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can <span>mention</span> about your interest.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AddressNew {...formLocation} className="h-12 w-full" />
            <Button
              type="submit"
              disabled={applied}
              className="mt-4 p-4 text-lg uppercase w-40"
            >
              Apply
            </Button>
          </form>
        </Form>
      )}
      <div>
        <h2 className="text-lg font-semibold leading-7 text-gray-900">
          Adoption Application Form
        </h2>
        <p className="mt-1 leading-6 text-gray-600">
          Thank you for considering adopting a pet from our shelter. Providing a
          loving home to a pet in need is a wonderful decision. Before you
          proceed with the adoption process, please take a moment to read the
          following information.
        </p>
        <p className="mt-4 leading-6 text-gray-600">
          Before submitting your adoption application, please make sure you are
          ready for the responsibilities of pet ownership. Pets require time,
          attention, and resources to thrive. They become an integral part of
          your family, and their well-being is our top priority.
        </p>
      </div>
    </div>
  )
}

export default ApplyForm
