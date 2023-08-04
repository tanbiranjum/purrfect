import deleteImage from "@/app/actions/delete-image"
import { NextResponse } from "next/server"

interface AdoptionApplicationParams {
    adoptionId: string
}

export async function DELETE(request: Request, { params }: { params: AdoptionApplicationParams }) {
    const { adoptionId } = params

    try {
        const adoption = await prisma?.adoptionApplication.findUnique({
            where: {
                id: adoptionId,
            },
            include: {
                pet: true,
            }
        })

        if (!adoption) {
            return NextResponse.json(JSON.stringify('Not found'), {
                status: 404,
            })
        }
        await prisma?.adoptionApplication.delete({
            where: {
                id: adoptionId,
            }
        })

        await prisma?.address.delete({
            where: {
                id: adoption.addressId,
            }
        })

        await prisma?.pet.delete({
            where: {
                id: adoption.petId,
            }
        })

        // delete image from uploadthing
        // hey copilot this giving me error. fix it
        await deleteImage(adoption.pet.imageSrc as string)


        return NextResponse.json(JSON.stringify('success'), {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(JSON.stringify(error), {
            status: 500,
        })
    }
} 