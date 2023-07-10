"use client"

import React, { useMemo, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

import useAdoptionModal from "@/hooks/use-adoption-modal"

import Modal from "./modal"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const useAdoption = useAdoptionModal()
  const [step, setStep] = useState(STEPS.CATEGORY)

  const { register, watch } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  })

  const category = watch("category")

  const onBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1)
    }
  }

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
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
  return (
    <Modal name="Adoption" isOpen={useAdoption.isOpen} toggle={toggle}>
      <div></div>
    </Modal>
  )
}

export default RentModal
