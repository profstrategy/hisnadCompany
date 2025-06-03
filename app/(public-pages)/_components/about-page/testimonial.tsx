'use client'
import React from 'react'
import TestimonialCard from './testimonial-card'
import { motion } from 'framer-motion'
import { testimonials } from '@/constants/contents'
import { AppHeading } from '@/components/reusables/app-heading'
import TestimonialCarousel from './testimonial-carousel'

const Testimonial = () => {
    return (
        <section className='max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-16'>
            <AppHeading variant='h2' className='text-center mb-16'>What Our Clients Says</AppHeading>
            <div className='md:grid grid-cols-2 gap-12 hidden '>
                {testimonials.map((itm, i) => (
                    <motion.div
                        key={i}
                        className="p-12 bg-[#dbdbdb] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1 xmd:hidden md:block"
                        id="testimonial"
                    >
                        <TestimonialCard testimony={itm} key={i} />
                    </motion.div>
                ))

                }

            </div>
            <div className='md:hidden '>
                <TestimonialCarousel />
            </div>

        </section>
    )
}

export default Testimonial