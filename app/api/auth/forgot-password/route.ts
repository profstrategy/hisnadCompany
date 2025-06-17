import { prisma } from "@/_lib/prisma";
import { getUser } from "@/_lib/prisma-data-service";
import { generateResetPasswordToken } from "@/_lib/tokens/reset-password-token";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        // Validate email input
        if (!email) {
            return NextResponse.json({
                message: 'Email is required'
            }, { status: 400 })
        }

        const getUserByThierEmail = await getUser(email)

        // Check if user exists
        if (!getUserByThierEmail) {
            return NextResponse.json({
                message: 'User not found'
            }, { status: 404 })
        }

        // Generate password reset token
        const reset_password_token = generateResetPasswordToken(getUserByThierEmail.id)

        // Store the generated token in the user table with expiry
        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: {
                reset_password_token: reset_password_token,
                reset_password_token_expiry: new Date(Date.now() + 3600000) 
            }
        })

        const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${reset_password_token}`
        
        const sendLink = await resend.emails.send({
            from: 'noreply@hisnad.com',
            to: email,
            subject: 'Reset your password',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Password Reset Request</h2>
                    <p>We received a request to reset your password. Click the link below to reset your password:</p>
                    <a href="${resetLink}" style="background-color: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Reset Password</a>
                    <p><strong>This link expires in 1 hour.</strong></p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        })

        // Check for email sending errors
        if (sendLink.error) {
            return NextResponse.json({
                message: 'Failed to send reset password email',
                error: sendLink.error,
                success:false
            }, { status: 500 })
        }

        return NextResponse.json({
            message: 'Reset password link sent successfully!',
            userId: updatedUser.id,
            success:true
        }, { status: 200 })

    } catch (error) {
        console.error('Password reset error:', error)
        return NextResponse.json({
            message: 'Failed to send reset password link',
            success: false
        }, { status: 500 })
    }
}