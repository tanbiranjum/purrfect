"use client"

import React, { useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { z } from "zod"

import { adoptionSchema } from "@/lib/validations/adoption"
import useAdoptionModal from "@/hooks/use-adoption-modal"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  CATEGORY = 1,
  LOCATION = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  OWNER = 5,
}

const RentModal = () => {
  const useAdoption = useAdoptionModal()
  const [step, setStep] = useState(STEPS.INFO)

  const form = useForm<z.infer<typeof adoptionSchema>>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  })

  const category = form.watch("category")

  const onBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1)
    }
  }

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.OWNER) {
      return "Create"
    }
    return "Next"
  }, [step])

  const toggle = () => {
    if (useAdoption.isOpen) {
      return useAdoption.close()
    }
    useAdoption.open()
  }

  const renderForm = () => {
    switch (step) {
      case STEPS.INFO:
        return (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select value of your pet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="bird">Bird</SelectItem>
                      <SelectItem value="rabbit">Rabbit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )
      case STEPS.CATEGORY:
        return <div>Category</div>
      case STEPS.LOCATION:
        return <div>Location</div>
      default:
        return null
    }
  }

  return (
    <Modal name="Adoption" isOpen={useAdoption.isOpen} toggle={toggle}>
      <Form {...form}>{renderForm()}</Form>
      <div className="flex justify-start gap-3">
        <Button onClick={onBack} disabled={step == 0}>
          Prev
        </Button>
        <Button onClick={onNext}>{actionLabel}</Button>
      </div>
    </Modal>
  )
}

export default RentModal
