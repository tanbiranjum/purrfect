"use client"

import React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

interface AuthFormDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  name: string
  description: string
  children: React.ReactNode
}

const AuthFormDialog: React.FC<AuthFormDialogProps> = ({
  open,
  setOpen,
  name,
  description,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default AuthFormDialog
