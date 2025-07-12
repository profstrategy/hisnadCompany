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
import React, { useState } from 'react'
import { authZodValidator, initialStepTypeSchema } from '@/schemas/auth.schema'
import { useOnboardingValidation } from '@/hooks/useOnboardingValidation'
import AppDialogBox from '@/components/reusables/app-dialog-box'
import { useGlobalStore } from '@/providers/store-provider'
import { AppSuccessToast } from '@/components/reusables/app-toast'


const OnboardingInitialStep = () => {
    const [isLoading, setIsloading] = React.useState(false)
     const [isLoadingResendEmail, setIsloadingResendEmail] = React.useState(false)
     const [ successPage, setSuccessPage ] = useState(false)
     const onboardingData = useGlobalStore(store => store.context.confirmedUserData)

    const router = useRouter()
    const {
        sendEmailModal,
        setSendEmailModal,
        resendOnboardingEmail,
        registerEmail,
    } = useOnboardingValidation()

    const { handleSubmit, formState: { errors }, register, reset } = useForm<initialStepTypeSchema>({
        resolver: zodResolver(authZodValidator('initialStep')),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: { email: '' },
    })

    const handleRegisterEmail = async (formData: initialStepTypeSchema) => {
        setIsloading(true)
        try {
            const registerEmailResult = await registerEmail(formData.email)

            if (!registerEmailResult) {
                return
            }

            if (registerEmailResult.success) {
                reset()

                const userId = registerEmailResult.userId;
                if (typeof userId === 'string') {
                    setTimeout(() => {
                        router.push(CLIENT_ROUTES.PublicPages.onboarding.finalStep(userId));
                    }, 3000)
                }
            }

        } catch (error: any) {
        } finally {
            setIsloading(false)
        }
    }

    const handleResendOnboardingEmail = async () => {
        setIsloadingResendEmail(true)
        try{
            console.log(onboardingData?.userId)
            const response = await resendOnboardingEmail(onboardingData?.userId ?? '')
            if(!response) return

            if(response.success){
                AppSuccessToast({ message: response.message ?? '', duration: 6000 })
                setSuccessPage(true)
            }
            return response
        }catch (error: any) { 
            // Already set by the hook
        } finally {
            setIsloadingResendEmail(false)
        }
    }

    return (
        <motion.div>
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
                    onClick={() => router.push('/')}
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

            {sendEmailModal && (
                <AppDialogBox
                    open={sendEmailModal}
                    onOpenChange={setSendEmailModal}
                    title='Verify your previous registration'
                    description='Check your email to complete your account validation'
                    confirmText='Send link'
                    isLoading={isLoadingResendEmail}
                    onConfirm={handleResendOnboardingEmail}
                />
            )}

            {successPage && <AppDialogBox
                open={successPage}
                onOpenChange={setSuccessPage}
                title='Email confirmation link successful'
                confirmText='Back Home'
                onCancel={() => router.push('/')}
                onConfirm={() => router.push('/')}
                description='Check your email'
            />}
        </motion.div>
    )
}

export default OnboardingInitialStep