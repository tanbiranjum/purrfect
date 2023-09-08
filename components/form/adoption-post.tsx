"use client"

import React, { useContext, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { adoptionSchema } from "@/lib/validations/adoption"
import { useLocation } from "@/hooks/use-location"
import { AuthContext } from "@/app/providers/auth-provider"

import AddressNew from "../address/address-new"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Separator } from "../ui/separator"
import ImageUpload from "./Image-upload"
import FormInput from "./form-input"
import PetCategorySelect from "./pet-category-select"
import PetGenderSelect from "./pet-gender-select"

type Props = {}

const AdoptionPost = (props: Props) => {
  const formLocation = useLocation()
  const currentUser = useContext(AuthContext)
  const form = useForm<z.infer<typeof adoptionSchema>>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      name: "",
      category: "",
      age: "",
      gender: "",
      imageSrc: "",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      address: "",
      lat: 0,
      lon: 0,
      description: "",
    },
  })
  const imageSrc = form.watch("imageSrc")
  const searchText = form.watch("address")

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onSubmit = async (values: z.infer<typeof adoptionSchema>) => {
    values = {
      ...values,
      address: formLocation.address,
      lat: formLocation.location.lat,
      lon: formLocation.location.lon,
    }
    try {
      const adoption = await axios.post("/api/adoption", {
        values,
        currentUser,
      })
      if (adoption) {
        toast.success(`Your pet is ready for adoption`)
        form.reset()
      }
    } catch (error: any) {
      toast.error(`Something went wrong! ${error.message}`)
    }
  }

  useEffect(()=> {
    form.setValue("address", formLocation.address)
    form.setValue("lat", formLocation.location.lat)
    form.setValue("lon", formLocation.location.lon)
  }, [formLocation.address, formLocation.location.lat, formLocation.location.lon])

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(onSubmit)()
        }}
        className="bg-white p-4 rounded-md"
      >
        <div className="grid grid-cols-6 py-8">
          <div className="col-span-2">
            <div className="flex">
              <FormField
                control={form.control}
                name="imageSrc"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        onChange={(value) => setCustomValue("imageSrc", value)}
                        value={imageSrc}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <FormInput
              form={form}
              name="name"
              label="What's your pet name?"
              placeholder="name"
              className="bg-white"
            />
            <PetCategorySelect
              form={form}
              name="category"
              label="Select your pet species"
              placeholder="Species"
              className="w-full"
            />
            <div className="flex gap-2">
              <FormInput form={form} name="age" label="Age" placeholder="age" />
              <PetGenderSelect
                form={form}
                name="gender"
                label="Select your pet gender"
                placeholder="Select gender"
                className="w-full"
              />
            </div>
            <Separator className="my-6" />
            <FormInput
              form={form}
              name="ownerName"
              label="Your name"
              placeholder="name"
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                form={form}
                name="ownerPhone"
                label="Phone number"
                placeholder="phone"
                className="col-span-1"
                type="tel"
              />
              <FormInput
                form={form}
                name="ownerEmail"
                label="Email"
                type="email"
                placeholder="email"
                className="col-span-1"
              />
            </div>
            <div>
              <p className="text-sm font-semibold py-2">Enter your address</p>
              <AddressNew {...formLocation} className="w-full h-auto py-3" />
            </div>
            <FormInput
              form={form}
              name="description"
              label="Description"
              placeholder="food habit, instinct"
              className="w-full"
            />
            <div className="mt-4">
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default AdoptionPost
