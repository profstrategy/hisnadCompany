import { AppHeading } from '@/components/reusables/app-heading'
import { teamContents } from '@/constants/contents'
import { motion } from 'framer-motion'
import React from 'react'
import TeamCard from './team-card'
import TeamCarousel from './team-carousel'

const TeamPage = () => {
    return (
        <section className='max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8'>
            <AppHeading variant='h2' className='text-center mb-16'>Meet Our Elders</AppHeading>
            <div className='md:grid grid-cols-2 gap-12 hidden '>
               {teamContents.map((itm) => (
                <TeamCard team={itm} key={itm.id} />
               ))}

            </div>
            <div className='md:hidden '>
                <TeamCarousel />
            </div>

        </section>
    )
}

export default TeamPage
