import getCurrentUser from "@/app/actions/get-current-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { adoptionId: string } }) {
    const adoptionId = params.adoptionId
    const currentUser = await getCurrentUser()

    const adoptionApplication = await prisma?.adoptionRequest.findFirst({
        where: {
            adoptionApplicationId: adoptionId as string,
            applicantId: currentUser?.id as string,
        }
    })

    if (!adoptionApplication) {
        return NextResponse.json({
            message: 'not found'
        }, {
            status: 404,
        })
    }

    return NextResponse.json({
        message: 'success',
        adoptionApplication
    }, {
        status: 200,
    })
}