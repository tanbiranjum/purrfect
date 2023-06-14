"use client"

import React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import UserRegisterForm from "../user-register-form"

interface RegisterFormDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const RegisterFormDialog: React.FC<RegisterFormDialogProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Signup Now</DialogTitle>
          <DialogDescription>
            Register To Aircnc is easier than you think
          </DialogDescription>
        </DialogHeader>
        <UserRegisterForm />
      </DialogContent>
    </Dialog>
  )
}

export default RegisterFormDialog
