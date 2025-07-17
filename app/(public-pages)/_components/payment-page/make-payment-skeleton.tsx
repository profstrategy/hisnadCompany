import React from 'react'
import { motion } from 'framer-motion'

const InitializePaymentPageSkeleton = () => {
  // Shimmer animation variants
  const shimmer:any = {
    initial: { backgroundPosition: '-200px 0' },
    animate: { 
      backgroundPosition: '200px 0',
      transition: {
        duration: 1.5,
        ease: 'linear',
        repeat: Infinity
      }
    }
  }

  // Pulse animation for elements
  const pulse:any = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse' as const
      }
    }
  }

  // Skeleton component with shimmer effect
  const SkeletonBox = ({ className, variant = 'shimmer' }: { className: string, variant?: 'shimmer' | 'pulse' }) => (
    <motion.div
      variants={variant === 'shimmer' ? shimmer : pulse}
      initial="initial"
      animate="animate"
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400px_100%] rounded ${className}`}
      style={{
        backgroundImage: variant === 'shimmer' 
          ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
          : undefined
      }}
    />
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='bg-white rounded-2xl w-full max-w-md md:max-w-2xl flex flex-col items-center justify-center py-10 px-6 sm:px-10 md:px-12 shadow-xl border border-gray-200'
      >
        {/* Branding Section Skeleton */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='flex flex-col items-center justify-center gap-4 mb-8 w-full'
        >
          {/* Logo Skeleton */}
          <SkeletonBox className="w-24 h-8" />
          
          {/* Subtitle Skeleton */}
          <div className='text-center'>
            <SkeletonBox className="w-48 h-4" />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6 }}
          className='border-b border-gray-100 w-full mb-8'
        />

        <div className='w-full'>
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className='flex flex-col items-center space-y-8'
            >
              {/* Header Skeleton */}
              <div className='text-center space-y-2'>
                <SkeletonBox className="w-48 h-8 mx-auto" variant="pulse" />
                <SkeletonBox className="w-64 h-4 mx-auto" />
              </div>

              {/* Amount Display Skeleton */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 rounded-2xl px-6 py-6 w-full md:w-3/4 text-center shadow-sm'
              >
                <SkeletonBox className="w-24 h-4 mx-auto mb-2" />
                <SkeletonBox className="w-32 h-8 mx-auto" variant="pulse" />
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2 }}
                className='border-b border-gray-100 w-full'
              />

              {/* Property Details Skeleton */}
              <div className='w-full space-y-6'>
                {/* Selected Property */}
                <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-3 md:gap-6 items-center'>
                  <SkeletonBox className="w-32 h-5" />
                  <div className='bg-gray-50 border border-gray-200 rounded-xl px-4 py-3'>
                    <SkeletonBox className="w-full h-5" />
                  </div>
                </div>

                {/* Property Type */}
                <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-3 md:gap-6 items-center'>
                  <SkeletonBox className="w-28 h-5" />
                  <div className='bg-gray-50 border border-gray-200 rounded-xl px-4 py-3'>
                    <SkeletonBox className="w-full h-5" />
                  </div>
                </div>

                {/* Payment Plan */}
                <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-3 md:gap-6 items-center'>
                  <SkeletonBox className="w-24 h-5" />
                  <div className="w-full h-12 rounded-xl border border-gray-200 px-4 py-3 flex items-center justify-between">
                    <SkeletonBox className="w-40 h-5" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button Skeleton */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
                className='w-full pt-4'
              >
                <motion.div
                  variants={pulse}
                  initial="initial"
                  animate="animate"
                  className='w-full h-14 rounded-xl bg-gradient-to-r from-indigo-300 to-purple-300 flex items-center justify-center space-x-2'
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <SkeletonBox className="w-40 h-5 bg-white/30" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Back Button Skeleton */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8 }}
        whileHover={{ scale: 1.1 }}
        className="fixed top-28 left-8 w-14 h-14 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center shadow-lg"
      >
        <motion.div
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-6 text-indigo-300"
        >
          <SkeletonBox className="w-full h-full rounded" />
        </motion.div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full"
          />
          <motion.span
            variants={pulse}
            initial="initial"
            animate="animate"
            className="text-sm text-gray-600 font-medium"
          >
            Loading payment details...
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default InitializePaymentPageSkeleton