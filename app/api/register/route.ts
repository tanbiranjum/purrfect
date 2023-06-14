import bcrypt from 'bcrypt'
import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { email, name, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    return NextResponse.json(user)
}