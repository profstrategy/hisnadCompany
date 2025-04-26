import { AppHeading } from '@/components/reusables/app-heading'
import React from 'react'

const AboutHisnad = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-8'>
        <div className='mb-8 max-w-2xl m-auto text-center'>
            <AppHeading variant='h1' className='text-center'>Tackling Africa’s real estate hurdles, one challenge at a time</AppHeading>

            <p className='mt-4 text-lg text-gray-600 leading-relaxed'>
              We transform land into legacy assets through documentation excellence and agri-investment innovation. 
              Founded over 10 years ago, Al-Hisnad Home and Property specializes in secure real estate investments with 100% freehold titles. 
              Our farmland partnerships deliver an average annual return of 25%.
            </p>
        </div>

        <div className="relative overflow-hidden w-full pt-[56.25%] rounded-3xl">
        <iframe
          className="absolute inset-0 w-full h-full bg-black opacity-90"
          src="https://804e39kyw6.ufs.sh/f/DSZcL8WoAVeGue4qR47034ytiSWxTIE8eZNhcjDXU2lFOmns"
          title="hisnad-welcoming-video"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
    </section>
  )
}

export default AboutHisnad