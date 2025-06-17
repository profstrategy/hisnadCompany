'use client'
import React from 'react'
import { AppHeading } from '@/components/reusables/app-heading';
import { motion } from 'framer-motion';
import { Logo } from '@/components/reusables/navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppButton from '@/components/reusables/app-button';
import { PaymentInitializationResponse, Subscriptions } from '@/constants/types';
import { addSearchParamsToUrl, formatFullNumber, formatNumber, removeNoneAlphanumericEntity } from '@/_lib/utils';
import { CLIENT_ROUTES } from '@/_lib/routes';
import { Payment_plan } from '@/constants/generic';

interface InitializePaymentPageProps {
  initialized_sub: Subscriptions
}

const InitializePaymentPage = ({ initialized_sub }: InitializePaymentPageProps) => {
  const router = useRouter();
  const [isInstallment, setIsInstallment] = React.useState<boolean>(false)
  const [installment, setInstallment] = React.useState<string>()

// update URL as amount changes
  useSearchParams().get('plan') as (typeof Payment_plan[keyof typeof Payment_plan]) || Payment_plan.FULL_PAYMENT

  // calculate installment and full paymenty
  let amount: number = Number(initialized_sub.amount)
  const installmentAmount = formatFullNumber(amount * 0.5, 'NGN', 'en-NG')
  const fullAmount = formatFullNumber(amount, 'NGN', 'en-NG')

  const handleAmountChange = React.useCallback(async (plan: typeof Payment_plan[keyof typeof Payment_plan]) => {
    if (plan === 'installment') {
      setInstallment(installmentAmount)
      setIsInstallment(true)
      const url = `/make-payment/${initialized_sub.initialized_payment_id}?size=${initialized_sub.size}&plan=${plan}`
      router.push(url)

    } else {
      const url = `/make-payment/${initialized_sub.initialized_payment_id}?size=${initialized_sub.size}&plan=${plan}`
      router.push(url)
      setIsInstallment(false)
      setInstallment(undefined)
    }
}, [installmentAmount, initialized_sub.initialized_payment_id, initialized_sub.size, router])


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='bg-white rounded-2xl w-full max-w-md md:max-w-2xl flex flex-col items-center justify-center py-10 px-6 sm:px-10 md:px-12 shadow-xl border border-gray-200'
      >
        {/* Branding Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='flex flex-col items-center justify-center gap-4 mb-8 w-full'
        >
          <Logo />
          <div className='text-center'>
            <p className='text-gray-600 text-sm'>Secure and simple property payments</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6 }}
          className='border-b border-gray-100 w-full mb-8'
        />

        <div className='w-full'>
          <form className='space-y-8'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className='flex flex-col items-center space-y-8'
            >
              {/* Header */}
              <div className='text-center space-y-2'>
                <AppHeading variant='h2' className='text-gray-800'>Initialize Payment</AppHeading>
                <p className='text-gray-500 text-sm'>Complete your property purchase with ease</p>
              </div>

              {/* Amount Display */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 rounded-2xl px-6 py-6 w-full md:w-3/4 text-center shadow-sm'
              >
                <p className='text-sm text-green-600 font-medium mb-1'>Total Amount</p>
                <AppHeading variant='h3' className='text-green-700 font-bold text-center'>{isInstallment ? installment : fullAmount}</AppHeading>

              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2 }}
                className='border-b border-gray-100 w-full'
              />

              {/* Property Details */}
              <div className='w-full space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-3 md:gap-6 items-center'>
                  <h3 className='text-gray-700 font-medium text-sm md:text-base'>Selected Property</h3>
                  <div className='bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center text-gray-700 font-medium'>
                    {removeNoneAlphanumericEntity(initialized_sub?.property_select ?? '').toUpperCase()}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-3 md:gap-6 items-center'>
                  <h3 className='text-gray-700 font-medium text-sm md:text-base'>Property Type</h3>
                  <div className='bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center text-gray-700 font-medium'>
                    {removeNoneAlphanumericEntity(initialized_sub?.property_type ?? '').toUpperCase()}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-3 md:gap-6 items-center'>
                  <h3 className='text-gray-700 font-medium text-sm md:text-base'>Payment Plan</h3>
                  <Select onValueChange={(value) => {
                    if (value === 'installment') {
                      handleAmountChange('installment')
                    } else {
                      handleAmountChange('full_payment')
                    }
                  }}>
                    <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100">
                      <SelectValue placeholder="Choose payment plan" />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-gray-200'>
                      <SelectGroup>
                        <SelectLabel className='text-gray-600 font-medium'>Flexible Payment Options</SelectLabel>
                        <SelectItem value="full_payment" className='py-3 px-4 hover:bg-green-50'>
                          <div className='flex items-center justify-between w-full gap-1'>
                            <div className='flex items-center space-x-3'>
                              <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                              <span>Full Payment</span>
                            </div>
                            <span className='text-green-600 font-semibold'>{fullAmount}</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="installment" className='py-3 px-4 hover:bg-blue-50'>
                          <div className='flex items-center justify-between w-full gap-1' >
                            <div className='flex items-center space-x-3'>
                              <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                              <span>Installment (50% upfront payment)</span>
                            </div>
                            <span className='text-blue-600 font-semibold'>{installmentAmount}</span>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
                className='w-full pt-4'
              >
                <AppButton
                  type='submit'
                  variant='primary'
                  className='w-full h-14 text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                >
                  <div className='flex items-center justify-center space-x-2'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Process Secure Payment</span>
                  </div>
                </AppButton>
              </motion.div>
            </motion.div>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8 }}
        whileHover={{ scale: 1.1, boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push(CLIENT_ROUTES.PublicPages.properties.onboarded(
          initialized_sub.property_select ?? '',
          initialized_sub.user_id
        ))}
        className="fixed top-28 left-8 w-14 h-14 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center shadow-lg cursor-pointer hover:border-indigo-300 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default InitializePaymentPage