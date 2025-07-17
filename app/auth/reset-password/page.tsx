'use client'
import { Suspense } from "react";
import ResetPasswordPage, { LoadingSpinner } from "../_component/reset-password";


export default async function UserForgotPasswordPage() {
    return (
        <section>
            <Suspense fallback={<LoadingSpinner />}>
                <ResetPasswordPage />
            </Suspense>
        </section>
    )
}