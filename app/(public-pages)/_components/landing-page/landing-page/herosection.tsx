'use client'
import { AppHeading } from '@/components/reusables/app-heading'
import { estate, invest } from '@/public'
import Image from 'next/image'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import AppButton from '@/components/reusables/app-button'
import { IoIosArrowForward } from 'react-icons/io'
import { splitPhoneNumber } from '@/_lib/utils'
import Features from './features'
import { useRouter } from 'next/navigation'
import { CLIENT_ROUTES } from '@/_lib/routes'
import Link from 'next/link'

const DynamicWords_1 = () => {
  const words_2 = ['Invest', 'Buy', 'Save'];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words_2.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      key={index}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-600 font-bold whitespace-nowrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {words_2[index]}
    </motion.span>
  );
};

const DynamicWords = () => {
  const words_1 = ['in real estate', 'in agriculture'];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words_1.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      key={index}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-600 font-bold whitespace-nowrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {words_1[index]}
    </motion.span>
  );
};

const HeroSection = () => {
  const router = useRouter()
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      {/* Announcement Banner */}
      <motion.div 
        className="inline-flex items-center justify-center space-x-2 sm:space-x-4 px-4 py-2 rounded-full bg-blue-50 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="bg-white px-3 py-1 rounded-full shadow-xs">
          <span className="text-xs sm:text-sm font-medium text-gray-900">Product Launch 🎉</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="text-xs sm:text-sm font-medium text-gray-700">Land Banking</span>
          <FaArrowRightLong className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
        </span>
      </motion.div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center mb-32">
        {/* Combined Row for md/lg screens */}
        <div className="hidden md:flex flex-col items-center">
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <DynamicWords_1 />
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={invest}
                  width={120}
                  height={120}
                  alt="Invest icon"
                  quality={100}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 border-4 border-green-400 rounded-lg hover:rounded-xl transition-all duration-300"
                />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="mx-4"
            >
              <AppHeading className="text-6xl md:text-7xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap">
                effortlessly
              </AppHeading>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Layout (stacked) */}
        <div className="md:hidden flex flex-col items-center space-y-6 sm:space-y-8">
          {/* First Row */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <DynamicWords_1 />
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={invest}
                width={120}
                height={120}
                alt="Invest icon"
                quality={100}
                className="w-16 sm:w-20 border-4 border-green-400 rounded-lg hover:rounded-xl transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* "effortlessly" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <AppHeading className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              effortlessly
            </AppHeading>
          </motion.div>
        </div>

        {/* Second Row (common for all screen sizes) */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-6 md:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <DynamicWords />
          <motion.div
            whileHover={{ rotate: -10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={estate}
              width={120}
              height={120}
              alt="Estate icon"
              quality={100}
              className="w-16 sm:w-20 md:w-24 lg:w-28 border-4 border-amber-400 rounded-lg hover:rounded-xl transition-all duration-300"
            />
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AppButton 
            variant='primary' 
            className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-medium rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            onClick={() => router.push(CLIENT_ROUTES.PublicPages.properties.index)}
          >
            Explore curated properties
            <IoIosArrowForward className="w-5 h-5" />
          </AppButton>
          
          <Link href={'tel:+234 810 444 1104'}>
          <AppButton 
            variant='primary'
            className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md transition-all"
          >
            Call +234 {splitPhoneNumber('8104441104')}
          </AppButton>
          </Link>
        </motion.div>
        
      </div>
      <Features />
    </section>
  );
};

export default HeroSection;