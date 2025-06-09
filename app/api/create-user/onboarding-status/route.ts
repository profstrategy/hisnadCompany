import { prisma } from "@/_lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        // Query your database for existing onboarding data
        const onboardingData = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                status: true,
            
            }
        })

        if (!onboardingData) {
            return NextResponse.json({ error: 'No onboarding data found' }, { status: 404 })
        }

        return NextResponse.json({
            email: onboardingData.email,
            userId: onboardingData.id,
            status: onboardingData.status
        })

    } catch (error) {
        console.error('Error fetching onboarding status:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}