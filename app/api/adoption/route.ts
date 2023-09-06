import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prismadb"
import getAdoptionListings from "@/app/actions/get-adoption-listings"
import { IFilterParams } from "@/app/types"

export async function POST(request: NextRequest) {
  const { values, currentUser } = await request.json()

  try {
    const newPet = await prisma?.pet.create({
      data: {
        name: values.name,
        category: values.category,
        age: values.age * 1,
        gender: values.gender,
        ownerId: currentUser?.id,
        imageSrc: values.imageSrc,
        description: values.description,
      },
    })

    const newAddress = await prisma?.address.create({
      data: {
        address: values.address,
        lat: values.lat,
        lon: values.lon,
      },
    })

    const newAdoption = await prisma?.adoptionApplication.create({
      data: {
        petId: newPet?.id,
        applicantId: currentUser?.id,
        name: values.ownerName,
        email: values.ownerEmail,
        phone: values.ownerPhone,
        addressId: newAddress?.id,
      },
      include: {
        pet: true,
        applicant: true,
      },
    })
    console.log(newAdoption)

    return NextResponse.json(JSON.stringify(newAdoption), {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(JSON.stringify(error), {
      status: 500,
    })
  }
}

export async function GET(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams.entries())
  const adoptions = await getAdoptionListings(query as IFilterParams)
  try {
    return NextResponse.json(JSON.stringify(adoptions), {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(JSON.stringify(error), {
      status: 500,
    })
  }
}
