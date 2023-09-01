import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { adoptionRequestId, adoptionApplicationId, userId } =
    await request.json()

  try {
    const adoptionRequest = prisma?.adoptionRequest.update({
      where: {
        id: adoptionRequestId,
      },
      data: {
        accepted: true,
      },
    })

    const adoptionApplication = prisma?.adoptionApplication.update({
      where: {
        id: adoptionApplicationId,
      },
      data: {
        adopted: true,
      },
    })

    // TODO:  delete all adoption request
    // create adoption history application
    const adoptionHistory = prisma?.adoptionHistory.create({
      data: {
        adoptionApplicationId,
        adoptedById: userId,
        adoptionRequestId,
        adopted: true,
      },
    })

    const [updatedRequest, updatedApplication, createdHistory] =
      await Promise.all([adoptionRequest, adoptionApplication, adoptionHistory])

    return NextResponse.json(
      JSON.stringify({
        message: "success",
        adoptionRequest: updatedRequest,
        adoptionApplication: updatedApplication,
        adoptionHistory: createdHistory,
      }),
      {
        status: 201,
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(JSON.stringify(error), {
      status: 500,
    })
  }
}
