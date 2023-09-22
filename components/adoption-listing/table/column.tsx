"use client"

import { ColumnDef } from "@tanstack/react-table"
import ActionConfirm from "./action-confirm"

export type AdoptionRequest = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  status: boolean
  userId: string
  message: string | null
  adoptionApplicationId: string | null
}

// const handleConfirmAdoption = async (
//   requestId: string,
//   adoptionApplicationId: string,
//   userId: string
// ) => {
//   await axios.post("/api/adoption/request/confirm", {
//     adoptionRequestId: requestId,
//     adoptionApplicationId,
//     userId,
//   })
// }

export const columns: ColumnDef<AdoptionRequest>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      const formatted = status
        ? "Accepted".toUpperCase()
        : "Pending".toUpperCase()
      return !status ? (
        <div className="inline-block bg-yellow-200 text-yellow-800 font-semibold  px-3 py-1 rounded-lg tex-sm">
          {formatted}
        </div>
      ) : (
        <div className="inline-block bg-green-200 text-green-800 font-semibold px-3 py-1 rounded-lg text-sm">
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "id",
    cell: ({ row }) => {
      const { id, userId, message, adoptionApplicationId } = row.original
      return (
        <ActionConfirm
          id={id}
          userId={userId}
          adoptionApplicationId={adoptionApplicationId as string}
          message={message}
        />
      )
    },
  },
]
