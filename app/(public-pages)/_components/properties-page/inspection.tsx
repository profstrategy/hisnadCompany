import { AppHeading } from '@/components/reusables/app-heading'
import Image from 'next/image'
import React from 'react'
import InspectionForm from './inspection-form'
import CallUs from '@/components/reusables/call-us'

const Inspection = () => {
    return (
        <div className='' id='inspection-form'>
            <div className='flex flex-col items-center justify-center gap-4 py-10'>
                <AppHeading className='h1'>COME SITE-SEE TODAY!</AppHeading>
                <h1 className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>Site inspection is always a delightful experience for our clients, and prospects. You get to come take in the exquisite land property deals we have in store.</h1>
                <div className='grid md:grid-cols-3 grid-cols-1 w-full overflow-hidden gap-4 '>
                    <Image
                        src={'/hisnad-1.jpg'}
                        alt='hisnad-1'
                        width={500}
                        height={500}
                        quality={100}
                        className='rounded-sm rounded-e-2xl shadow-lg hover:scale-105 transition-all duration-500 h-[350px] object-cover hidden md:block'
                    />

                    <Image
                        src={'/hisnad-3.jpg'}
                        alt='hisnad-3'
                        width={500}
                        height={500}
                        quality={100}
                        className='rounded-2xl shadow-lg hover:scale-105 transition-all duration-500 h-[350px] object-cover w-full'
                    />

                    <Image
                        src={'/hisnad-2.jpg'}
                        alt='hisnad-2'
                        width={500}
                        height={500}
                        quality={100}
                        className='rounded-s-2xl shadow-lg hover:scale-105 transition-all duration-500 h-[350px] object-cover w-full hidden md:block'
                    />
                </div>
                <div className=' -mt-10 md:-mt-8 md:w-8/12 w-full'>
                    <InspectionForm />
                </div>

            </div>

            <div><CallUs /></div>
        </div>
    )
}

export default Inspection