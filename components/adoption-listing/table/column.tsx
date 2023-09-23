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
        <div className="tex-sm inline-block rounded-lg bg-yellow-200  px-3 py-1 font-semibold text-yellow-800">
          {formatted}
        </div>
      ) : (
        <div className="inline-block rounded-lg bg-green-200 px-3 py-1 text-sm font-semibold text-green-800">
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
