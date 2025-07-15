'use client'
import React from 'react'
import { motion } from 'framer-motion'

const SingularPropertySkeleton = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
    >
      {/* Back button */}
      <div className={`h-10 w-32 rounded-full bg-gray-200 mb-8 md:mb-12 ${shimmer}`}></div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className={`h-10 w-3/4 rounded bg-gray-200 ${shimmer}`}></div>
          <div className={`h-5 w-1/2 rounded bg-gray-200 ${shimmer}`}></div>
          <div className="flex gap-2 mt-2">
            <div className={`h-6 w-20 rounded-full bg-gray-200 ${shimmer}`}></div>
            <div className={`h-6 w-24 rounded-full bg-gray-200 ${shimmer}`}></div>
          </div>
        </div>
        <div className={`md:w-1/3 h-32 rounded-lg bg-gray-200 ${shimmer}`}></div>
      </div>

      {/* Image skeleton */}
      <div className={`w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] rounded-lg bg-gray-200 mt-8 ${shimmer}`}></div>

      {/* Main content */}
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <div className="space-y-3">
            <div className={`h-7 w-48 rounded bg-gray-200 ${shimmer}`}></div>
            <div className={`h-4 w-full rounded bg-gray-200 ${shimmer}`}></div>
            <div className={`h-4 w-5/6 rounded bg-gray-200 ${shimmer}`}></div>
            <div className={`h-4 w-2/3 rounded bg-gray-200 ${shimmer}`}></div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className={`h-7 w-40 rounded bg-gray-200 ${shimmer}`}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full bg-gray-200 ${shimmer}`}></div>
                  <div className={`h-4 w-3/4 rounded bg-gray-200 ${shimmer}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <div className={`h-7 w-48 rounded bg-gray-200 ${shimmer}`}></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full bg-gray-200 ${shimmer}`}></div>
                  <div className={`h-4 w-4/5 rounded bg-gray-200 ${shimmer}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Payment plans */}
          <div className={`bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4 ${shimmer}`}>
            <div className={`h-7 w-56 rounded bg-gray-200 mb-4 ${shimmer}`}></div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className={`bg-white p-4 rounded-lg ${shimmer}`}>
                  <div className={`h-5 w-3/4 rounded bg-gray-200 ${shimmer}`}></div>
                  <div className={`h-4 w-1/2 rounded bg-gray-200 mt-2 ${shimmer}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA section */}
          <div className={`bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 ${shimmer}`}>
            <div className={`h-7 w-48 rounded bg-gray-200 ${shimmer}`}></div>
            <div className={`h-4 w-full rounded bg-gray-200 ${shimmer}`}></div>
            <div className="space-y-6">
              <div className={`h-12 w-full rounded-lg bg-gray-200 hidden md:block ${shimmer}`}></div>
              <div className={`h-12 w-full rounded-lg bg-gray-200 ${shimmer}`}></div>
              <div className={`h-12 w-full rounded-lg bg-gray-200 ${shimmer}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:hidden z-50 border-t border-gray-200">
        <div className="flex gap-3">
          <div className={`flex-1 h-12 rounded-lg bg-gray-200 ${shimmer}`}></div>
          <div className={`flex-1 h-12 rounded-lg bg-gray-200 ${shimmer}`}></div>
        </div>
      </div>
    </motion.div>
  )
}

export default SingularPropertySkeleton