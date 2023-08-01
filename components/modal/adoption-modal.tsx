/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useContext, useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { District } from "bd-geojs/dist/data/districts"
import { Upazilla } from "bd-geojs/dist/data/upazillas"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { adoptionSchema } from "@/lib/validations/adoption"
import useAdoptionModal from "@/hooks/use-adoption-modal"
import { useLocation } from "@/hooks/use-location"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthContext } from "@/app/providers/auth-provider"

import ImageUpload from "../input/Image-upload"
import FormInput from "../input/form-input"
import FormSelect from "../input/form-select"
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
import { Input } from "../ui/input"
import Modal from "./modal"

enum STEPS {
  INFO = 0,
  IMAGES = 1,
  ADOPTIONINFO = 2,
  LOCATION = 3,
  DESCRIPTION = 4,
}

const RentModal = () => {
  const useAdoption = useAdoptionModal()
  const [step, setStep] = useState(STEPS.INFO)
  const { getDistricts, getDivisions, getUpazillas } = useLocation()
  const [divisionId, setDivisionId] = useState<string>("1")
  const [districtId, setDistrictId] = useState<string>("1")
  const [districts, setDistricts] = useState<District[]>([])
  const [upazilla, setUpazilla] = useState<Upazilla[]>([])
  const currentUser = useContext(AuthContext)

  useEffect(() => {
    setDistricts(getDistricts(divisionId))
  }, [divisionId])

  useEffect(() => {
    setUpazilla(getUpazillas(districtId))
  }, [districtId])

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
      division: "1",
      district: districts[0]?.id || "1",
      upazilla: upazilla[0]?.id || "1",
      description: "",
    },
  })

  const category = form.watch("category")
  const imageSrc = form.watch("imageSrc")

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1)
    }
  }

  const onNext = () => {
    setStep((prev) => {
      if (prev === STEPS.DESCRIPTION) {
        return prev
      }
      return prev + 1
    })
  }

  const toggle = () => {
    if (useAdoption.isOpen) {
      return useAdoption.close()
    }
    useAdoption.open()
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

  const generateDistrict = () => {
    return districts.map((district) => (
      <SelectItem key={district.id} value={district.id}>
        {district.name}
      </SelectItem>
    ))
  }

  const generateUpazilla = () => {
    return upazilla.map((upazilla) => (
      <SelectItem key={upazilla.id} value={upazilla.id}>
        {upazilla.name}
      </SelectItem>
    ))
  }

  const onSubmit = async (values: z.infer<typeof adoptionSchema>) => {
    try {
      const adoption = await axios.post("/api/adoption", {
        values,
        currentUser,
      })
      console.log(adoption)
      if (adoption) {
        toast.success(
          `Your pet ${adoption.data.pet.name} is ready for adoption`
        )
        form.reset()
        useAdoption.close()
      }
    } catch (error: any) {
      toast.error(`Something went wrong! ${error.message}`)
    }
  }

  const renderForm = () => {
    switch (step) {
      case STEPS.INFO:
        return (
          <>
            <FormInput
              form={form}
              name="name"
              label="Pet name"
              placeholder="name"
            />
            <FormSelect
              form={form}
              name="category"
              label="Category"
              placeholder="Select value of your pet"
              options={generateCatagory()}
            />
            <FormInput form={form} name="age" label="Age" placeholder="age" />
            <FormSelect
              form={form}
              name="gender"
              label="Gender"
              placeholder="Select your pet's gender"
              options={generateGender()}
            />
          </>
        )
      case STEPS.IMAGES:
        return (
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
        )
      case STEPS.ADOPTIONINFO:
        return (
          <>
            <FormInput
              form={form}
              name="ownerName"
              label="Your name"
              placeholder="name"
            />
            <FormInput
              form={form}
              name="ownerPhone"
              label="Phone number"
              placeholder="phone"
            />
            <FormInput
              form={form}
              name="ownerEmail"
              label="Email"
              type="email"
              placeholder="email"
            />
          </>
        )
      case STEPS.LOCATION:
        return (
          <>
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setDivisionId(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getDivisions().map((division) => (
                        <SelectItem
                          className="text-black"
                          key={division.id}
                          value={division.id}
                        >
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setDistrictId(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{generateDistrict()}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upazilla"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upazilla</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{generateUpazilla()}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )
      case STEPS.DESCRIPTION:
        return (
          <FormInput
            form={form}
            name="description"
            label="Description"
            placeholder="food habit, instinct"
          />
        )
      default:
        return null
    }
  }

  return (
    <Modal
      className="max-w-4xl"
      name="Adoption Form"
      isOpen={useAdoption.isOpen}
      toggle={toggle}
    >
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (step < STEPS.DESCRIPTION) {
              onNext()
            } else {
              form.handleSubmit(onSubmit)()
            }
          }}
        >
          {renderForm()}
          <div className="flex justify-start gap-3">
            {step === STEPS.DESCRIPTION && (
              <Button type="submit">Create</Button>
            )}
          </div>
        </form>
      </Form>
      <div className="flex justify-start gap-3">
        <Button type="button" onClick={onBack} disabled={step === STEPS.INFO}>
          Prev
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={step === STEPS.DESCRIPTION}
        >
          Next
        </Button>
      </div>
    </Modal>
  )
}

export default RentModal
