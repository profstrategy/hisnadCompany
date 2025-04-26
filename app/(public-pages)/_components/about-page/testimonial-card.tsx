'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';
import { Testimonial } from '@/constants/types';
import { Star, StarHalf } from 'lucide-react';

interface TestimonialProps {
    testimony: Testimonial;
    theme?: 'light' | 'dark';
}

const TestimonialCard = ({ theme = 'light', testimony }: TestimonialProps) => {
    const {
        id = 'Unknown id',
        name = 'Unknown Name',
        role = 'Unknown Role',
        testimonial = 'Unknown Testimony',
        property = "Unknown property",
        image = '/placeholder.png',
        rating = 4.5,
    } = testimony;

    // Calculate stars to display
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <Star
                        key={`full-${i}`}
                        className="w-5 h-5 fill-current"
                        strokeWidth={1.5}
                    />
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <StarHalf
                        key={`half-${i}`}
                        className="w-5 h-5 fill-current"
                        strokeWidth={1.5}
                    />
                );
            } else {
                stars.push(
                    <Star
                        key={`empty-${i}`}
                        className="w-5 h-5"
                        strokeWidth={1.5}
                    />
                );
            }
        }
        return stars;
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1,
            },
        },
        hover: {
            y: -5,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const themeStyles = {
        light: {
            background: 'bg-white',
            border: 'border-gray-100',
            hoverBorder: 'hover:border-primary-200',
            iconBg: 'bg-gray-50',
            text: {
                primary: 'text-gray-900',
                secondary: 'text-gray-700',
                tertiary: 'text-gray-500',
            },
            badge: 'bg-gray-50',
            button: 'bg-gray-50 hover:bg-gray-100',
            star: {
                filled: 'text-yellow-400',
                empty: 'text-gray-300',
            },
            shadow: 'shadow-lg hover:shadow-xl',
        },
        dark: {
            background: 'bg-gray-900',
            border: 'border-gray-800',
            hoverBorder: 'hover:border-primary-600',
            iconBg: 'bg-gray-800',
            text: {
                primary: 'text-white',
                secondary: 'text-gray-300',
                tertiary: 'text-gray-400',
            },
            badge: 'bg-gray-800',
            button: 'bg-gray-800 hover:bg-gray-700',
            star: {
                filled: 'text-yellow-400',
                empty: 'text-gray-700',
            },
            shadow: 'shadow-lg hover:shadow-xl',
        },
    };

    const styles = themeStyles[theme];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            variants={containerVariants}
            className={`relative w-full h-auto rounded-2xl ${styles.shadow} transition-all duration-300`}
        >
            <motion.div
                whileHover="hover"
                variants={containerVariants}
                className="h-full"
            >

                <motion.div
                    variants={childVariants}
                    className="absolute left-1/2 transform -translate-x-1/2 -top-8"
                >
                    <div className="relative -mb-16 z-10 flex justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20">
                            <Image
                                src={image}
                                className="rounded-full border-4 border-white/90 shadow-2xl transform hover:scale-105 transition-all duration-500 object-cover"
                                fill
                                alt={`${name}-image`}
                                onError={(e) => {
                                    e.currentTarget.src = '/placeholder-user.png';
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border-4 border-transparent"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(99, 102, 241, 0.5)'
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </motion.div>

                <div
                    className={`${styles.background} p-6 pt-16 pb-8 rounded-2xl border ${styles.border} ${styles.hoverBorder} transition-all duration-300 flex flex-col`}
                >


                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center text-center">
                        {/* Name and Role */}
                        <motion.div variants={childVariants} className="mb-4 w-full">
                            <h3 className={`text-lg md:text-xl font-bold ${styles.text.primary} mb-1`}>
                                {name}
                            </h3>
                            <p className={`text-sm ${styles.text.tertiary} font-medium`}>
                                {role}
                            </p>
                        </motion.div>

                        {/* Property */}
                        <motion.div variants={childVariants} className="mb-4 w-full">
                            <p className={`text-xs font-semibold ${styles.text.secondary} uppercase tracking-wider`}>
                                {property}
                            </p>
                        </motion.div>

                        {/* Star Rating */}
                        <motion.div
                            variants={childVariants}
                            className="flex items-center justify-center mb-4 gap-0.5"
                            title={`${rating} out of 5 stars`}
                        >
                            {renderStars()}
                            <span className={`ml-2 text-sm font-medium ${styles.text.secondary}`}>
                                {rating.toFixed(1)}
                            </span>
                        </motion.div>

                        {/* Testimonial */}
                        <motion.div
                            variants={childVariants}
                            className={`flex-1 w-full px-2 overflow-y-auto scrollbar-thin ${theme === 'light' ? 'scrollbar-thumb-gray-300' : 'scrollbar-thumb-gray-700'} scrollbar-track-transparent`}
                        >
                            <blockquote className={`text-sm md:text-base ${styles.text.secondary} italic leading-relaxed`}>
                                "{testimonial}"
                            </blockquote>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    variants={childVariants}
                    className={`absolute -top-2 -right-2 w-12 h-12 rounded-full ${theme === 'light' ? 'bg-primary-100/50' : 'bg-primary-900/30'} blur-xl`}
                />
            </motion.div>
        </motion.div>
    );
};

export default TestimonialCard;