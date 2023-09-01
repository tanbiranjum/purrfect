import { getAdoptionRequestByUser } from "@/app/actions/get-adoption-request";
import getCurrentUser from "@/app/actions/get-current-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { adoptionId: string } }) {
    const adoptionId = params.adoptionId
    const currentUser = await getCurrentUser()

    const adoptionApplication = await getAdoptionRequestByUser(currentUser?.id as string, adoptionId)

    if (!adoptionApplication) {
        return NextResponse.json({
            message: 'not found'
        }, {
            status: 200,
        })
    }

    return NextResponse.json({
        message: 'success',
        adoptionApplication
    }, {
        status: 200,
    })
}