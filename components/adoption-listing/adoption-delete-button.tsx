"use client"

import React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SafeAdoptionApplication } from "@/app/types/index"

import { Icons } from "../icons"

interface AdoptionDeleteButtonProps extends Partial<SafeAdoptionApplication> {}

const AdoptionDeleteButton: React.FC<AdoptionDeleteButtonProps> = ({
  id,
  applicantId,
}) => {
  return (
    <div className="cursor-pointer">
      <AlertDialog>
        <AlertDialogTrigger>
          <Icons.delete color="red" size="24" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdoptionDeleteButton
