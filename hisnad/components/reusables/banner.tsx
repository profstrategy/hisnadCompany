import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

const Banner = () => {
    // #f9ddf2
  return (
    <div className='bg-[#f14570] w-full max-h-20 h-10 flex justify-center items-center gap-2'>
        <h3 className='sm:text-sm xmd:text-[10px] text-[.55rem] text-[#111] font-semibold'>Land and Agriculture Appreciate you back - <span className='font-normal'>Do the smart thing 🤩  </span></h3><Link href={''}><FaArrowRightLong className='w-5 h-5' /></Link>
    </div>
  )
}

export default Banner