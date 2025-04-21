'use client'
import AppButton from '@/components/reusables/app-button'
import { AppHeading } from '@/components/reusables/app-heading'
import AppTextInput from '@/components/reusables/app-text-input'
import { Logo } from '@/components/reusables/navbar'
import { CLIENT_ROUTES } from '@/lib/routes'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'

const ResetPasswordStepTwo = () => {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className='bg-white rounded-xl w-full max-w-md flex flex-col items-center py-10 px-6 sm:px-8 shadow-sm border border-gray-100'
            >
                {/* Branding Section - Simplified */}
                <div className='flex flex-col items-center mb-8'>
                    <Logo />
                    <h1 className="mt-3 font-bold text-2xl bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                        Hisnad
                    </h1>
                </div>

                {/* Content Section */}
                <div className='w-full space-y-6'>
                    <div className='text-center space-y-1'>
                        <AppHeading variant='h3' className='font-medium text-gray-900'>
                            Reset Password - Step 2
                        </AppHeading>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-brand-color-text mb-6 sm:mb-8 text-center sm:text-left text-sm sm:text-base lg:text-lg"
                        >
                            Enter the 6-digit code sent to your email
                        </motion.p>
                    </div>

                    <form className='space-y-4'>
                        <AppTextInput
                           type="text"
                           name="otp"
                           placeholder="Enter 6-digit code"
                            required
                            
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'

                        />

                        <AppButton
                            variant='primary'
                            className="w-full h-11 font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                        >
                            Continue
                        </AppButton>
                    </form>
                </div>
            </motion.div>

            {/* Back Button - More Subtle */}
            <motion.button
                onClick={() => router.push('./')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-8 left-8 w-12 h-12 rounded-full border-2 border-primary-600 flex items-center justify-center bg-white shadow-md cursor-pointer"
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </motion.button>
        </motion.div>
    )
}

export default ResetPasswordStepTwo