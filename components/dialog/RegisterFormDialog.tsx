"use client"

import React from "react"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"

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
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex">
            <Input name="Email" placeholder="Email" />
          </div>
          <div className="flex">
            <Input name="Password" placeholder="Password" type="password" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Signup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterFormDialog
