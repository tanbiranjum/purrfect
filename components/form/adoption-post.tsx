"use client"

import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { adoptionSchema } from "@/lib/validations/adoption"
import { useLocation } from "@/hooks/use-location"
import useUploadImage from "@/hooks/use-upload-image"
import { AuthContext } from "@/app/providers/auth-provider"

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
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import ImageUpload from "./Image-upload"
import FormInput from "./form-input"
import PetCategorySelect from "./pet-category-select"
import PetGenderSelect from "./pet-gender-select"

type Props = {}

const AdoptionPost = (props: Props) => {
  const formLocation = useLocation()
  const currentUser = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadImage()
  const router = useRouter()

  const form = useForm<z.infer<typeof adoptionSchema>>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      name: "",
      category: "",
      age: 0,
      gender: "",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      address: "",
      lat: 0,
      lon: 0,
      description: "",
    },
  })

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onSubmit = async (values: z.infer<typeof adoptionSchema>) => {
    setIsSubmitting(true)
    try {
      const res = await startUpload(files)
      const fileUrl = res?.map((file: any) => file.fileUrl)[0]
      const formValues = {
        ...values,
        address: formLocation.address,
        lat: formLocation.location.lat,
        lon: formLocation.location.lon,
        imageSrc: fileUrl,
      }
      const adoption = await axios.post("/api/adoption", {
        values: formValues,
        currentUser,
      })
      if (adoption) {
        const responseData = JSON.parse(adoption.data)
        toast.success(`Your pet is ready for adoption`)
        router.push(`/adoption/${responseData.id}`)
        setIsSubmitting(true)
      }
    } catch (error: any) {
      toast.error(`Something went wrong! ${error.message}`)
      setIsSubmitting(true)
    }
  }

  useEffect(() => {
    form.setValue("address", formLocation.address)
    form.setValue("lat", formLocation.location.lat)
    form.setValue("lon", formLocation.location.lon)
  }, [
    formLocation.address,
    formLocation.location.lat,
    formLocation.location.lon,
  ])

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
              <ImageUpload files={files} setFiles={setFiles} />
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
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
              <FormInput
                form={form}
                {...form.register("age", { valueAsNumber: true })}
                type="number"
                label="Age"
                placeholder="age"
              />
              <PetGenderSelect
                form={form}
                name="gender"
                label="Select your pet gender"
                placeholder="Select gender"
                className="w-full"
              />
            </div>
            <Separator className="my-5" />
            <div className="-mt-2">
              <FormInput
                form={form}
                name="ownerName"
                label="Your name"
                placeholder="name"
                className="w-full"
              />
            </div>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your pet"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>mention</span> about habit, medical condition, others.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
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
