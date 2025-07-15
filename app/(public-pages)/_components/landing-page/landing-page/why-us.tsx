'use client'
import { AppHeading } from '@/components/reusables/app-heading'
import { features } from '@/constants/types'
import { mark, invests, trust, vicinity, bgImage } from '@/public'
import Image from 'next/image'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WhyHisnad = () => {
    const content: features[] = [
        { id: 'four', content: 'Trust?', image: trust },
        { id: 'one', content: 'Faster Documentation Process?', image: mark },
        { id: 'two', content: '⁠Best Investment Opportunities?', image: invests },
        { id: 'three', content: '⁠Best location idea?', image: vicinity },
        { id: 'five', content: '⁠Zero Omo-onile issues?', image: mark }
    ]

    const [activeIndex, setActiveIndex] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % content.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [content.length])

    const activeItem = content[activeIndex]

    return (
        <section className=' py-10 relative'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  max-h-dvh h-auto'>

                <AppHeading variant='h2' className='text-start'>
                    - Why Hisnad?
                </AppHeading>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeItem.id}
                        className='flex flex-row items-center justify-between gap-6 sm:gap-2 z-50'
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        <div className='text-xl sm:text-2xl md:text-[4rem] font-semibold text-gray-800 max-w-full'>
                            {activeItem.content}
                        </div>
                        <div className='flex-shrink-0'>
                            <Image
                                src={activeItem.image}
                                alt={activeItem.id}
                                width={80}
                                height={80}
                                quality={100}
                                className='w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl shadow-md'
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
                <Image
                    src={bgImage}
                    width={100}
                    height={100}
                    quality={100}
                    alt='bgImage'
                    className='absolute z-20 bottom-0 w-[100rem]  h-[100rem] md:w-[34rem] md:h-[34rem] md:left-0 md:bottom-30 opacity-40'
                />

                <Image
                    src={bgImage}
                    width={100}
                    height={100}
                    quality={100}
                    alt='bgImage'
                    className='absolute hidden md:block z-20 w-[40rem] h-[40rem] md:w-[34rem] md:h-[34rem] md:right-0 md:bottom-30 opacity-40 '
                />
           
        </section>
    )
}

export default WhyHisnad
