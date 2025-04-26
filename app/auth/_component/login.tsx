'use client'
import AppButton from '@/components/reusables/app-button'
import { AppHeading } from '@/components/reusables/app-heading'
import AppTextInput from '@/components/reusables/app-text-input'
import { Logo } from '@/components/reusables/navbar'
import { motion } from 'framer-motion'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { CLIENT_ROUTES } from '@/lib/routes'

const Login = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false);
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

                {/* Login Form Section */}
                <div className='w-full'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className='flex flex-col items-center justify-center gap-1 mb-6'
                    >
                        <AppHeading variant='h2'>Welcome back</AppHeading>
                        <p className='text-center text-sm text-gray-500'>
                            Sign in to manage your properties and transactions
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className='flex flex-col gap-4 w-full'
                    >
                        <AppTextInput
                            label='Email Address'
                            placeholder="Enter your email"
                            required
                            type="email"
                            className='w-full py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                        />

                        <AppTextInput
                            label='Password'
                            placeholder="Enter your password"
                            required
                            type={showPassword ? `text` : `password`}
                            className='w-full py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                            icon={
                                showPassword ? (
                                  <IoEyeOffOutline onClick={() => setShowPassword(false)} />
                                ) : (
                                  <IoEyeOutline onClick={() => setShowPassword(true)} />
                                )
                              }
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className='flex items-center justify-between text-sm mb-2'
                        >
                            <label className='flex items-center'>
                                <input
                                    type="checkbox"
                                    className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded'
                                />
                                <span className='ml-2 text-gray-600'>Remember me</span>
                            </label>
                            <p onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.auth.forgotPassword}`)} className='text-primary-600 hover:text-primary-800 font-medium'>
                                Forgot password?
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <AppButton
                                variant='primary'
                                className="w-full h-12 text-white font-medium rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Sign In
                            </AppButton>
                        </motion.div>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className='mt-6 text-center text-sm text-gray-500'
                    >
                        Don't have an account?{' '}
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="" className='text-primary-600 hover:text-primary-800 font-medium'>
                                Create one
                            </Link>
                        </motion.span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Back Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/home')}
                className="fixed top-8 left-8 w-12 h-12 rounded-full border-2 border-primary-600 flex items-center justify-center bg-white shadow-md cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </motion.div>
        </motion.div>
    )
}

export default Login