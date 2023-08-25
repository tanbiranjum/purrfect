import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { adoptionRequestId, adoptionApplicationId, userId } = await request.json()

    try {
        const adoptionRequest = await prisma?.adoptionApplication.update({
            where: {
                id: adoptionApplicationId,
            },
            data: {
                adopted: true,
            }
        })

        // TODO:  delete all adoption request
        // create adoption history application
        const adoptionHistory = await prisma?.adoptionHistory.create({
            data: {
                adoptionApplicationId,
                adoptedById: userId,
                adoptionRequestId,
                adopted: true,
            }
        })


        return NextResponse.json(JSON.stringify({
            message: 'success',
            adoptionRequest,
            adoptionHistory
        }), {
            status: 201,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(JSON.stringify(error), {
            status: 500,
        })
    }
}