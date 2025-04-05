'use client'
import { AppHeading } from '@/components/reusables/app-heading'
import { deguardian, estate, invest, nairametrics, tribune, ustimes, vanguard } from '@/public'
import Image from 'next/image'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import AppButton from '@/components/reusables/app-button'
import { IoIosArrowForward } from 'react-icons/io'
import { splitPhoneNumber } from '@/lib/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

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
      className="text-[2.73rem] sm:text-6xl md:text-6xl lg:text-7xl text-[#f14570] font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
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
      className="text-[2.73rem] sm:text-6xl md:text-6xl lg:text-7xl text-[#f14570] font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {words_1[index]}
    </motion.span>
  );
};



const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center px-6 sm:px-8 lg:px-12 mx-auto max-w-[90rem] min-h-100 py-16">

      {/* Announcement Banner */}
      <div className="flex flex-wrap items-center justify-center py-2 px-4 rounded-xl xmd:rounded-full bg-[#e8f0ff] gap-3 sm:gap-4 w-full xmd:w-4/5 sm:w-3/5 lg:w-1/3 max-w-lg mx-auto xmd:flex-row flex-col">
        <div className="bg-white px-3 py-1 rounded-full">
          <h6 className="text-xs sm:text-sm font-medium">Product Launch 🤩</h6>
        </div>
        <h5 className="text-xs sm:text-sm font-medium flex gap-2">Land Banking
          <span className='grid self-center'><FaArrowRightLong className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /></span></h5>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 mt-10">
        <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7">
          <DynamicWords_1 />
          <Image
            src={invest}
            width={100}
            height={100}
            alt="invest"
            quality={100}
            className="w-32 sm:w-28 md:w-24 lg:w-32 border-4 border-[#44b83a] rounded-xl hover:rounded-full transition-all"
          />
        </div>

        <AppHeading className="text-6xl sm:text-7xl md:text-7xl lg:text-8xl text-black font-extrabold">
          effortlessly
        </AppHeading>

        <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6">
          <DynamicWords />
          <Image
            src={estate}
            width={80}
            height={80}
            alt="estate"
            quality={100}
            className="w-32 sm:w-28 md:w-24 lg:w-32 border-4 border-[#f2a818] rounded-xl hover:rounded-full transition-all"
          />
        </div>

        <div className='flex flex-col md:flex-row gap-2 '>
          <AppButton variant='secondary' className='bg-accent-primary rounded-sm text-sm flex gap-2 px-3'>Explore curated properties <span><IoIosArrowForward className='w-5 h-5' /></span></AppButton>

          <AppButton className='bg-white border-[1px] text-global-text border-gray-300 rounded-sm text-sm flex gap-2 px-[2.2rem]'>{`Call +234 ${splitPhoneNumber('8104441104')}`} </AppButton>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
