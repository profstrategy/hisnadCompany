'use client'
import React from 'react'
import AppButton from '@/components/reusables/app-button'
import { AppHeading } from '@/components/reusables/app-heading'
import AppTextInput from '@/components/reusables/app-text-input'
import { Logo } from '@/components/reusables/navbar'
import { CLIENT_ROUTES } from '@/_lib/routes'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { authZodValidator } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useOnboardingValidation } from '@/hooks/useOnboardingValidation'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { AppPhoneInputController } from '@/components/reusables/app-phone-input'
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage-keys'

interface OnboardingCompleteTypes {
    firstName?: string;
    lastName?: string;
    password?: string;
    address?: string;
    phoneNumber?: string;
    nextOfKinName?: string;
    nextOfKinPhoneNumber?: string;
    nextOfKinAddress?: string;
    accountType: 'USER' | 'ADMIN'
    status: 'onboarded' | 'pending'
}

const OnboardingFinalStep = ({ onboardingId }: { onboardingId: string }) => {
    const defaultValues = {
        firstName: '',
        lastName: '',
        password: '',
        address: '',
        phoneNumber: '',
        nextOfKinName: '',
        nextOfKinPhoneNumber: '',
        nextOfKinAddress: ''
    }
    const router = useRouter()
    const { completeOnboarding, isLoading, message, status, clearMessage } = useOnboardingValidation()
    const [showPassword, setShowPassword] = React.useState(false)

    const { handleSubmit, formState: { errors }, register, reset, control } = useForm<OnboardingCompleteTypes>({
        resolver: zodResolver(authZodValidator('finalStep')),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: defaultValues
    })

    const handleOnboardingCompletion = async (formData: OnboardingCompleteTypes) => {
        clearMessage();

        try {

            if (!onboardingId) {
                return;
            }

            // Step 2: complete onboarding process
            const completedResult = await completeOnboarding(formData, onboardingId);

            if (!completedResult) {
                // Completion failed - message is already set by the hook
                return;
            }

            if (completedResult.success) {
                reset(defaultValues);

                setTimeout(() => {
                    router.push(CLIENT_ROUTES.PublicPages.properties.index)
                }, 1000)
            }

            localStorage.setItem(LOCAL_STORAGE_KEYS.ONBOARDING_ID, completedResult.user?.userId || '');
            localStorage.setItem(LOCAL_STORAGE_KEYS.STATUS, completedResult.user?.status || 'pending');
            localStorage.setItem(LOCAL_STORAGE_KEYS.ONBOARDING_EMAIL, completedResult.user?.email || '');
        } catch (error) {
            console.error('Completion error:', error);
            // Error is already handled by the hook
        }
    };

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
                            Onboarding Final Step
                        </AppHeading>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center sm:text-left text-sm sm:text-base lg:text-lg"
                        >
                            We need your personal information, for storing your records on our
                            database
                        </motion.p>

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
                    <form className='space-y-4' onSubmit={handleSubmit(handleOnboardingCompletion)}>
                        <AppTextInput
                            label='First Name'
                            {...register('firstName')}
                            error={errors.firstName?.message}
                            placeholder="First Name"
                            required
                            type="text"
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                        />

                        <AppTextInput
                            label='Last Name'
                            {...register('lastName')}
                            error={errors.lastName?.message}
                            placeholder="Last Name"
                            required
                            type="text"
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'

                        />

                        <AppTextInput
                            label='Password'
                            {...register('password')}
                            error={errors.password?.message}
                            placeholder="Create your password"
                            required
                            type={showPassword ? 'text' : 'password'}
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'

                            icon={
                                showPassword ? (
                                    <IoEyeOffOutline onClick={() => setShowPassword(false)} />
                                ) : (
                                    <IoEyeOutline onClick={() => setShowPassword(true)} />
                                )
                            }
                        />


                        <AppTextInput
                            label='Address'
                            {...register('address')}
                            error={errors.address?.message}
                            placeholder="Full Address"
                            required
                            type="text"
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'

                        />

                        <AppPhoneInputController
                            name="phoneNumber"
                            control={control}
                            label="Phone Number"
                            placeholder="Phone Number"
                            className="w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        />

                        <AppTextInput
                            label='Next of Kin Name'
                            {...register('nextOfKinName')}
                            error={errors.nextOfKinName?.message}
                            placeholder="Next of Kin Name"
                            required
                            type="text"
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'

                        />

                        <AppPhoneInputController
                            name="nextOfKinPhoneNumber"
                            control={control}
                            label="Next Of Kin Phone Number"
                            placeholder="Your Next Of Kin Phone Number"
                            className="w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <AppTextInput
                            label='Next of Kin Address'
                            placeholder="Next of Kin Address"
                            required
                            type="text"
                            className='w-full py-3 px-4 border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                            {...register('nextOfKinAddress')}
                            error={errors.nextOfKinAddress?.message}
                        />

                        <AppButton
                            type='submit'
                            variant='primary'
                            className="w-full h-11 font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"

                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Completing...</span>
                                </div>
                            ) : (
                                'Complete Onboarding'
                            )}
                        </AppButton>
                    </form>
                </div>
            </motion.div>

            {/* Back Button - More Subtle */}
            <motion.button
                onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.onboarding.initialStep}`)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-28 left-8 w-12 h-12 rounded-full border-2 border-primary-600 flex items-center justify-center bg-white shadow-md cursor-pointer"
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </motion.button>
        </motion.div>
    )
}

export default OnboardingFinalStep