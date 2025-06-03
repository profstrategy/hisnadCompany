'use client'
import AppButton from '@/components/reusables/app-button'
import { AppHeading } from '@/components/reusables/app-heading'
import AppTextInput from '@/components/reusables/app-text-input'
import { Logo } from '@/components/reusables/navbar'
import { CLIENT_ROUTES } from '@/_lib/routes'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { authZodValidator, initialStepTypeSchema } from '@/schemas/auth.schema'
import { useOnboardingValidation } from '@/hooks/useOnboardingValidation'
import bcrypt from 'bcryptjs'
import AppDialogBox from '@/components/reusables/app-dialog-box'
import { hash } from 'crypto'
import { hashedData } from '@/_lib/utils'

const OnboardingInitialStep = () => {
    const [showOnboardingDialogModal, setshowOnboardingDialogModal] = React.useState(false)
    const [storedUserId, setStoredUserId] = React.useState<string | undefined>('')
    const [storedEmail, setStoredEmail] = React.useState<string | undefined>('')

    const router = useRouter()
    const {
        registerEmail,
        deleteIncompleteRegistration,
        clearMessage,
        isLoading,
        message,
        status
    } = useOnboardingValidation()

    const { handleSubmit, formState: { errors }, register, reset } = useForm<initialStepTypeSchema>({
        resolver: zodResolver(authZodValidator('initialStep')),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: { email: '' },
    })

    const handleRegisterEmail = async (formData: initialStepTypeSchema) => {
        // Clear any previous messages
        clearMessage()

        try {
            // Step 1: Validate and register email for onboarding
            const registerEmailResult = await registerEmail(formData.email)

            if (!registerEmailResult) {
                // Validation failed - message is already set by the hook
                return
            }

            console.log('user id:', registerEmailResult.userId)


            if (registerEmailResult.isReturningUser) {
                setStoredEmail(registerEmailResult.email);
                setStoredUserId(registerEmailResult.userId);
                setshowOnboardingDialogModal(true);
              
            }

            if (registerEmailResult.success) {
                reset()
                const userId = registerEmailResult.userId;
                console.log('email id:', userId)
                if (typeof userId === 'string') {
                    setTimeout(() => {
                        router.push(CLIENT_ROUTES.PublicPages.onboarding.finalStep(userId));
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Onboarding error:', error)
            // Error is already handled by the hook
        }
    }

    const handleStoredEmailConfirm = () => {
        setshowOnboardingDialogModal(false)
        if (storedUserId && storedEmail) {
            const userId = storedUserId;
            setTimeout(() => {
                router.push(CLIENT_ROUTES.PublicPages.onboarding.finalStep(userId));
            }, 1000);

        }
    }

    const handleStoredEmailCancel = async () => {
        if (storedUserId && storedEmail) {
            try {
                // Delete the incomplete registration
                await deleteIncompleteRegistration(storedEmail)
                setshowOnboardingDialogModal(false)
                // Reset the form
                reset()
            } catch (error) {
                console.error('Error deleting incomplete registration:', error)
            }
        }
    }

    const getMessageStyles = () => {
        switch (status) {
            case 'success':
                return 'text-green-600 bg-green-50 border border-green-200'
            case 'error':
                return 'text-red-600 bg-red-50 border border-red-200'
            default:
                return 'text-gray-600 bg-gray-50 border border-gray-200'
        }
    }

    return (

        // <AppDialogBox
        //     open={showOnboardingDialogModal}
        //     onOpenChange={setshowOnboardingDialogModal}
        //     trigger={<></>}
        //     title="Continue with saved email?"
        //     description={`We found a saved email(${storedEmail}). Would you like to continue with this email?`}
        //     confirmText="Yes, continue"
        //     cancelText="No, use different email"
        //     onConfirm={handleStoredEmailConfirm}
        //     onCancel={handleStoredEmailCancel}
        // />

        // <AppDialogBox
        //     open={showOnboardingDialogModal}
        //     onOpenChange={setshowOnboardingDialogModal}
        //     trigger={<></>}
        //     title="Onboarding Completed"
        //     description={`We found that you have completed onboarding process as. Please select a property to continue.`}
        //     confirmText="Select Property"
        //     cancelText="Cancel"
        //     // onConfirm={() =>
        //     //     router.push(CLIENT_ROUTES.PublicPages.properties.selectProperty())
        //     // }
        //     onCancel={() => setshowOnboardingDialogModal(false)}
        // />

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
                {/* Branding Section */}
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
                            Welcome to Hisnad
                        </AppHeading>
                        <p className='text-sm text-gray-500'>
                            Enter your email address to begin your onboarding journey
                        </p>
                    </div>

                    {/* Message Display */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-lg text-sm ${getMessageStyles()}`}
                        >
                            {message}
                        </motion.div>
                    )}

                    <form className='space-y-4' onSubmit={handleSubmit(handleRegisterEmail)}>
                        <AppTextInput
                            label='Email address'
                            placeholder="your@email.com"
                            type="email"
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                            {...register('email')}
                            error={errors.email?.message}
                            disabled={isLoading}
                        />

                        <AppButton
                            variant='primary'
                            type='submit'
                            disabled={isLoading}
                            className="w-full h-11 font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                'Continue'
                            )}
                        </AppButton>
                    </form>
                </div>
            </motion.div>

            {/* Back Button */}
            <motion.button
                onClick={() => router.push('/home')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-28 left-8 w-12 h-12 rounded-full border-2 border-primary-600 flex items-center justify-center bg-white shadow-md cursor-pointer hover:bg-primary-50 transition-colors"
                aria-label="Go back to home"
                disabled={isLoading}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </motion.button>
        </motion.div>

    )
}

export default OnboardingInitialStep