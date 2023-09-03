"use client"

import React, { useTransition } from "react"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"

import useAcceptModal from "@/hooks/use-accept-modal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Modal from "@/components/modal/modal"
import { useRouter } from "next/navigation"

type Props = {
  id: string
  userId: string
  adoptionApplicationId: string
}

const ActionConfirm = ({ id, userId, adoptionApplicationId }: Props) => {
  const acceptModal = useAcceptModal()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleConfirmAdoption = async (
    requestId: string,
    adoptionApplicationId: string,
    userId: string
  ) => {
    const response = await axios.post("/api/adoption/request/confirm", {
      adoptionRequestId: requestId,
      adoptionApplicationId,
      userId,
    })

    if(response.status === 201) {
      alert("Adoption Confirmed!")
      acceptModal.close()
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
    } else {
      acceptModal.close()
    }
  }

  const toggle = () => {
    if (acceptModal.isOpen) {
      acceptModal.close()
    } else {
      acceptModal.open()
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-green-800"
            onClick={() => acceptModal.open()}
          >
            Confirm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal
        name="Are you sure, you want to confirm?"
        isOpen={acceptModal.isOpen}
        toggle={toggle}
      >
        <div className="flex gap-2">
          <Button
            onClick={async () => {
              await handleConfirmAdoption(id, adoptionApplicationId, userId)
            }}
          >
            Confirm
          </Button>
          <Button variant="destructive" onClick={() => acceptModal.close()}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ActionConfirm
