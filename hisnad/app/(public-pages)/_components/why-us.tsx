import { features } from '@/constants/types'
import { fast_docs, invests } from '@/public'
import React from 'react'

const WhyHisnad = () => {
    const DynamicContent = () => {
        const content:features[] = [
            {id: 'one', content: 'Faster Documentation Process?', image: fast_docs},
            {id: 'two', content: '⁠Best Investment Opportunities?', image: invests},
            {id: 'three', content: '⁠Best Investment Opportunities?', image: invests},
            {id: 'four', content: 'Trust?', image: invests},
        ]
    }
  return (
    <section className='max-w-[700px] px-2 xmd:px-4 md:px-6 lg:px-8 mx-auto grid items-center sm:max-w-[50rem] md:max-w-[75rem] bg-[#e8f0ff] py-16 max-h-32 h-24'>
        <div>

        </div>
    </section>
  )
}

export default WhyHisnad