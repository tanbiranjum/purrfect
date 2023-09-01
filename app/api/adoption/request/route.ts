import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/get-current-user"

// create adoption request application
export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  const { adoptionId, name, phone, email, message, address } =
    await request.json()

  const newAddress = await prisma?.address.create({
    data: {
      address: address.address,
      lat: address.location.lat,
      lon: address.location.lon,
    },
  })

  const adoptionRequest = await prisma?.adoptionRequest.create({
    data: {
      name,
      phone,
      email,
      message,
      adoptionApplicationId: adoptionId,
      applicantId: currentUser?.id as string,
      addressId: newAddress?.id as string,
    },
  })

  return NextResponse.json(
    JSON.stringify({
      message: "success",
      adoptionRequest,
    }),
    {
      status: 200,
    }
  )
}
