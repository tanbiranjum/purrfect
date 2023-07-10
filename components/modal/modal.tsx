"use client"

import React from "react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

import { DialogHeader } from "../ui/dialog"

interface ModalProps {
  name: string
  isOpen?: boolean
  toggle?: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ name, isOpen, toggle, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
