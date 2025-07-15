import React from 'react'
import  { motion } from 'framer-motion'
import useSlider from '@/hooks/use-slider';
import { fadeInUp, staggerChildren } from './singular-property';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { AppHeading } from '@/components/reusables/app-heading';
import { FaCheckCircle } from 'react-icons/fa';
import AppButton from '@/components/reusables/app-button';
import Link from 'next/link';
import { SegregatedProperties } from '@/constants/types';
import { useRouter } from 'next/navigation';
import { CLIENT_ROUTES } from '@/_lib/routes';

type Props = {
    findPropertyById: SegregatedProperties | null
}

const SingularPropertyImageContentAndFeatureSection = ({ findPropertyById }:Props) => {
    const { setApi, count, current } = useSlider();
    const router = useRouter()
     const hasMultipleImages = findPropertyById?.mainImage && findPropertyById.mainImage.length > 1;
  return (
    <section>
               {/* Image Display Section */}
            <motion.div
                className="w-full mt-8"
                variants={fadeInUp}
            >
                {findPropertyById?.mainImage ? (
                    hasMultipleImages ? (
                        <div className="relative group">
                            <Carousel
                                className="w-full"
                                setApi={setApi}
                            >
                                <CarouselContent>
                                    {findPropertyById?.mainImage.map((img, index) => (
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
                                src={findPropertyById?.mainImage[0]}
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
                            {findPropertyById?.description}
                        </p>
                    </motion.div>

                    {findPropertyById?.features && findPropertyById?.features.length > 0 && (
                        <motion.div variants={fadeInUp}>
                            <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                Key Features
                            </AppHeading>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {findPropertyById?.features.map((feature, index) => (
                                    <li key={`${index}-feature`} className="flex items-start gap-2">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {findPropertyById?.benefit && findPropertyById?.benefit.length > 0 && (
                        <motion.div variants={fadeInUp}>
                            <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                Exclusive Benefits
                            </AppHeading>
                            <ul className="space-y-2">
                                {findPropertyById?.benefit.map((benefitItem, index) => (
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
                    {findPropertyById?.payment && findPropertyById?.payment.length > 0 && (
                        <motion.div
                            variants={fadeInUp}
                            className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4"
                        >
                            <AppHeading variant='h2' className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                Flexible Payment Plans
                            </AppHeading>
                            <div className="space-y-4">
                                {findPropertyById?.payment.map((paymentItem, index) => (
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
                            <AppButton variant="primary" className="w-full text-white bg-primary hover:bg-primary-dark transition-colors" onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.properties.parallel}`)}>
                                Book Inspection
                            </AppButton>
                            <Link href="tel:+234 810 444 1104"
                                target="_blank"
                                rel="noopener noreferrer">
                                <AppButton variant="secondary" className="w-full text-white bg-primary hover:bg-primary-dark transition-colors">
                                    Contact Agent
                                </AppButton>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
    </section>
  )
}

export default SingularPropertyImageContentAndFeatureSection