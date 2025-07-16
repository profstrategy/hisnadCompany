'use client'
import React from 'react'
import { motion } from 'framer-motion'
import AppTextInput from '@/components/reusables/app-text-input'
import AppButton from '@/components/reusables/app-button'
import { AppHeading } from '@/components/reusables/app-heading'
import { useForm } from 'react-hook-form'
import { forgotPassword } from '@/api/client-api/forgot-password'
import { Logo } from '@/components/reusables/navbar'

export default function ForgotPasswordPage() {
    interface FormData {
        email: string;
    }
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const defaultValues: FormData = {
        email: ''
    };

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset
    } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValues
    });

    const handleSubmitEmailToResetPassword = async (formData: FormData) => {
        try {
            setIsSubmitting(true);

            const data = await forgotPassword(formData.email);

            if (data) {
                reset();
            }

        } catch (error) {
            console.error('Failed to send reset link:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='bg-white rounded-xl w-full max-w-md md:max-w-lg flex flex-col items-center justify-center py-8 px-6 sm:px-10 md:px-12 shadow-lg'
            >
                {/* Branding Section */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className='flex flex-col items-center justify-center gap-3 mb-6 w-full'
                >
                    <Logo />
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                        Hisnad Home & Properties
                    </h1>
                    <p className='text-center text-xs sm:text-sm text-gray-500 mt-1'>
                        Your trusted real estate partner
                    </p>
                </motion.div>


                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6 }}
                    className='border-b border-gray-200 w-full mb-6'
                />
                <div className='w-full'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className='flex flex-col items-center justify-center gap-1 mb-6'
                    >
                        <AppHeading variant='h2'>Submit your registered email</AppHeading>

                    </motion.div>

                    <form onSubmit={handleSubmit(handleSubmitEmailToResetPassword)} className='flex flex-col gap-4'>
                        <AppTextInput
                            label='Email Address'
                            placeholder="Enter your email"
                            required
                            type="email"
                            className='w-full py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className='flex items-center justify-between text-sm mb-2'
                        >
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <AppButton
                                type='submit'
                                variant='primary'
                                className="w-full h-11 font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Please wait...</span>
                                    </div>
                                ) : (
                                    'Send me a link'
                                )}
                            </AppButton>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    )
}
