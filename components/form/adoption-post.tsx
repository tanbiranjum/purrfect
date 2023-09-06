"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectItem } from "@radix-ui/react-select"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { adoptionSchema } from "@/lib/validations/adoption"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import ImageUpload from "./Image-upload"
import { toast, useToaster } from "react-hot-toast"
import axios from "axios"

type Props = {}

const AdoptionPost = (props: Props) => {
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

  const generateCatagory = () => {
    return (
      <>
        <SelectItem value="cat">Cat</SelectItem>
        <SelectItem value="dog">Dog</SelectItem>
        <SelectItem value="bird">Bird</SelectItem>
        <SelectItem value="rabbit">Rabbit</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </>
    )
  }

  const generateGender = () => {
    return (
      <>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="unknown">Unknown</SelectItem>
      </>
    )
  }

  const onSubmit = async (values: z.infer<typeof adoptionSchema>) => {
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

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
            form.handleSubmit(onSubmit)()
        }}
      >
        <div className="grid grid-cols-6">
          <div className="col-span-2">
            <div>
              Upload Image of your pet
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
        </div>
      </form>
    </Form>
  )
}

export default AdoptionPost
