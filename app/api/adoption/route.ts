import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
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
            }
        })
        console.log(newAdoption)

        return NextResponse.json(JSON.stringify(newAdoption), {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(JSON.stringify(error), {
            status: 500,
        })
    }
}