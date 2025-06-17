'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { AppHeading } from '@/components/reusables/app-heading';
import { SegregatedProperties } from '@/constants/types';

type PropertyHeaderProps = {
    property: SegregatedProperties;
};

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export default function PropertyHeader({ property }: PropertyHeaderProps) {
    const router = useRouter();

    return (
        <div>     {/* Back Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/properties')}
                className="flex items-center gap-2 bg-accent-primary text-white rounded-full px-4 py-2 mb-8 md:mb-12 hover:bg-accent-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
                <FaArrowLeft className="text-lg" />
                <span className="font-medium text-sm sm:text-base">
                    Back to Properties
                </span>
            </motion.button>

            {/* Property Title and Details */}
            <motion.div
                className="flex-1 flex flex-col gap-4"
                variants={fadeInUp}
            >
                <AppHeading
                    variant='h1'
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                >
                    {property?.title ?? 'Property Title Not Available'}
                </AppHeading>

                <p className="text-gray-600 text-sm sm:text-base">
                    {property?.location ?? ''}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-blue-50 text-blue-800 rounded-full">
                        {property?.category ?? 'Category Not Available'}
                    </span>
                    <span className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${property?.status === 'Available'
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                        }`}>
                        {property?.status}
                    </span>
                </div>
            </motion.div>
            
        </div>
    );
}