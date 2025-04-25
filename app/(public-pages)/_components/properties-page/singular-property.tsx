'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { AppHeading } from '@/components/reusables/app-heading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import useSlider from '@/hooks/use-slider';
import AppButton from '@/components/reusables/app-button';
import Link from 'next/link';
import { FiPhoneCall } from 'react-icons/fi';
import { CLIENT_ROUTES } from '@/lib/routes';
import { SingularPropertyPreview } from '@/constants/types';

type SingularPropertyProp = {
    property: SingularPropertyPreview[]
}

const SingularProperty = ({ property }: SingularPropertyProp) => {
    const labels = ['Plot', 'Acre', 'Hectare'];
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const router = useRouter();
    const { setApi, count, current } = useSlider();

    if (!property || property.length === 0) {
        return (
            <motion.div
                {...fadeInUp}
                className="text-center text-gray-600 p-8 bg-red-50 rounded-lg shadow-sm max-w-md mx-auto my-16"
            >
                Property not found
            </motion.div>
        );
    }

    return (
        <>
            {property.map((prop) => {
                const { title, description, location, features, status, price, mainImage, category, benefit, payment } = prop;
                const hasMultipleImages = mainImage && mainImage.length > 1;

                return (
                    <motion.div
                        key={title}
                        {...fadeInUp}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('./')}
                            className="flex items-center gap-2 bg-accent-primary text-white rounded-full px-4 py-2 mb-8 md:mb-12 hover:bg-accent-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            <FaArrowLeft className="text-lg" />
                            <span className="font-medium text-sm sm:text-base">
                                Back to Properties
                            </span>
                        </motion.button>

                        <motion.div
                            className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-8"
                            variants={staggerChildren}
                        >
                            <motion.div
                                className="flex-1 flex flex-col gap-4"
                                variants={fadeInUp}
                            >
                                <AppHeading
                                    variant='h1'
                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                                >
                                    {title}
                                </AppHeading>

                                <p className="text-gray-600 text-sm sm:text-base">{location}</p>

                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-blue-50 text-blue-800 rounded-full">
                                        {category}
                                    </span>
                                    <span className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${status === 'Available'
                                        ? 'bg-green-50 text-green-800'
                                        : 'bg-red-50 text-red-800'
                                        }`}>
                                        {status}
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-col gap-4 md:w-1/3"
                            >
                                {price && Array.isArray(price) && (
                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                        <h3 className="text-gray-500 text-sm font-medium capitalize mb-1">
                                            Price
                                        </h3>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {price.map((p, index) => (
                                                <span key={index} className='flex flex-col gap-2'>
                                                    {labels[index]}: {p}
                                                    {index < price.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </p>
                                        <AppButton className="w-full mt-3 text-white">
                                            Pay Now
                                        </AppButton>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Image Display Section */}
                        <motion.div
                            className="w-full mt-8"
                            variants={fadeInUp}
                        >
                            {mainImage ? (
                                hasMultipleImages ? (
                                    <div className="relative group">
                                        <Carousel
                                            className="w-full"
                                            setApi={setApi}
                                        >
                                            <CarouselContent>
                                                {mainImage.map((img, index) => (
                                                    <CarouselItem key={index} className="relative w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] basis-3/4 mx-4">
                                                        <Image
                                                            src={img}
                                                            alt={`Property Image ${index + 1}`}
                                                            fill
                                                            className="object-cover rounded-lg"
                                                            quality={100}
                                                            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 50vw"
                                                        />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                                {current + 1} / {count}
                                            </div>
                                            <CarouselPrevious className="hidden sm:flex left-4 bg-white/80 hover:bg-white text-gray-800 hover:text-black" />
                                            <CarouselNext className="hidden sm:flex right-4 bg-white/80 hover:bg-white text-gray-800 hover:text-black" />
                                        </Carousel>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem]">
                                        <Image
                                            src={mainImage[0]}
                                            alt={`Property Image`}
                                            fill
                                            className="object-cover rounded-lg"
                                            quality={100}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                    No images available
                                </div>
                            )}
                        </motion.div>

                        {/* Sticky CTA for mobile */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:hidden z-50 border-t border-gray-200">
                            <div className="flex gap-3">
                                <AppButton className="flex-1 bg-accent-primary hover:bg-accent-primary/90 text-white">
                                    Pay Now
                                </AppButton>
                                <a
                                    href="https://wa.me/2348104441104"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AppButton variant="secondary" className="flex-1">
                                        <FiPhoneCall className='text-white w-8 h-8' />
                                    </AppButton>
                                </a>
                            </div>
                        </div>

                        <motion.div
                            className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
                            variants={staggerChildren}
                        >
                            <div className="md:col-span-2 space-y-8">
                                <motion.div variants={fadeInUp}>
                                    <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                        Property Description
                                    </AppHeading>
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                        {description}
                                    </p>
                                </motion.div>

                                {features && features.length > 0 && (
                                    <motion.div variants={fadeInUp}>
                                        <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                            Key Features
                                        </AppHeading>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {features.map((feature, index) => (
                                                <li key={`${index}-feature`} className="flex items-start gap-2">
                                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}

                                {benefit && benefit.length > 0 && (
                                    <motion.div variants={fadeInUp}>
                                        <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                            Exclusive Benefits
                                        </AppHeading>
                                        <ul className="space-y-2">
                                            {benefit.map((benefitItem, index) => (
                                                <li key={`${index}-benefit`} className="flex items-start gap-2">
                                                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-600 text-sm sm:text-base">{benefitItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </div>

                            <div className="space-y-8">
                                {payment && payment.length > 0 && (
                                    <motion.div
                                        variants={fadeInUp}
                                        className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4"
                                    >
                                        <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                            Flexible Payment Plans
                                        </AppHeading>
                                        <div className="space-y-4">
                                            {payment.map((paymentItem, index) => (
                                                <div key={`${index}-payment`} className="bg-white p-4 rounded-lg shadow-sm">
                                                    <h3 className="font-semibold text-gray-800">{paymentItem}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {paymentItem.includes('Initial') ?
                                                            '50% upfront payment' :
                                                            '50% balance payable within 3 months'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <motion.div
                                    variants={fadeInUp}
                                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4"
                                >
                                    <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Ready to Invest?
                                    </AppHeading>
                                    <p className="text-gray-600 text-sm">
                                        Secure your spot today with our easy payment options.
                                    </p>
                                    <div className="space-y-6">
                                        <AppButton className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white hidden md:flex">
                                            Pay Now
                                        </AppButton>

                                        <AppButton variant="primary" className="w-full text-white" onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.properties.parallel}`)}>
                                            Book Inspection
                                        </AppButton>
                                        <Link href="https://wa.me/2348104441104"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <AppButton variant="secondary" className="w-full text-white">
                                                Contact Agent
                                            </AppButton>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </>
    );
}

export default SingularProperty;