import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import AppButton from './app-button'
import { IoIosArrowForward } from 'react-icons/io'
import { splitPhoneNumber } from '@/lib/utils'
import Image from 'next/image'
import { houses } from '@/public'
import Link from 'next/link'

const CallUs = () => {
    return (
        <section className="w-full">
            {/* Image Container - Responsive height */}
            <div className='relative w-full h-[60vh] sm:h-[70vh] md:h-[76.67vh] lg:h-[80vh]'>
                <Image
                    src={houses}
                    fill
                    alt='call-us-image'
                    className='object-cover w-full'
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />

                {/* Overlay Content */}
                <div className='absolute inset-0 flex items-center justify-center w-full bg-black/20'>
                    <div className='w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 relative z-20'>
                        <Card className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8'>
                            <CardHeader className='w-full p-2 sm:p-4'>
                                <CardTitle className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-medium leading-tight sm:leading-snug md:leading-normal'>
                                    Enjoy your real estate investment journey with Hisnad Home and Properties
                                </CardTitle>
                            </CardHeader>

                            <CardContent className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center justify-center p-2 sm:p-4'>
                                <Link href={'/properties'} className='w-full sm:w-auto'>
                                    <AppButton
                                        variant='primary'
                                        className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-medium rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                                    >
                                        Explore curated properties
                                        <IoIosArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </AppButton>
                                </Link>

                                <Link href={'tel:08104441104'} className='w-full sm:w-auto'>
                                    <AppButton
                                        variant='primary'
                                        className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md transition-all"
                                    >
                                        Call +234 {splitPhoneNumber('8104441104')}
                                    </AppButton>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallUs