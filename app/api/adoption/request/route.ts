import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";



// create adoption request application
export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    const { adoptionId, name, phone, email, message } = await request.json()

    const adoptionRequest = await prisma?.adoptionRequest.create({
        data: {
            name,
            phone,
            email,
            message,
            adoptionApplicationId: adoptionId,
            applicantId: currentUser?.id as string,
        }
    })

    return NextResponse.json(JSON.stringify({
        message: 'success',
        adoptionRequest
    }), {
        status: 200,
    })
}