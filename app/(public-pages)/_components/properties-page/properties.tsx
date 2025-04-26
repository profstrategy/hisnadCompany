'use client';
import { ActivePropertyPagePreview, SegregatedProperties } from '@/constants/types';
import { CLIENT_ROUTES } from '@/lib/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PropertiesProps {
    pkg: ActivePropertyPagePreview;
    theme?: 'light' | 'dark';
}

export const Properties: React.FC<PropertiesProps> = ({ pkg, theme = 'dark' }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const themeStyles = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            hoverBorder: 'hover:border-primary-500',
            iconBg: 'bg-gray-100',
            text: {
                primary: 'text-gray-900',
                secondary: 'text-gray-600',
                tertiary: 'text-gray-500',
            },
            badge: 'bg-primary-100 text-primary-800',
            button: 'hover:bg-primary-50 hover:border-primary-500 hover:text-primary-700',
        },
        dark: {
            background: 'bg-[#1A1A1A]',
            border: 'border-[#333333]',
            hoverBorder: 'hover:border-primary-500',
            iconBg: 'bg-[#333333]',
            text: {
                primary: 'text-white',
                secondary: 'text-[#CCCCCC]',
                tertiary: 'text-[#666666]',
            },
            badge: 'bg-primary-900 text-primary-200',
            button: 'hover:bg-primary-900 hover:border-primary-500 hover:text-primary-200',
        },
    };

    const styles = themeStyles[theme];

    const singlePackageLink = CLIENT_ROUTES.PublicPages.properties.details(
        pkg?.slug ?? ''
    );

    const handleClick = () => {
        router.push(singlePackageLink);
    };

    const cardVariants = {
        initial: { y: 0, scale: 1 },
        hover: { y: -5, scale: 1.02 }
    };

    const imageVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05 }
    };

    const buttonVariants = {
        initial: {
            backgroundColor: 'transparent',
            borderColor: theme === 'light' ? '#e5e7eb' : '#333333'
        },
        hover: {
            backgroundColor: theme === 'light' ? '#f0fdf4' : '#052e16',
            borderColor: '#10b981'
        }
    };

    // Only render image if mainImage exists and has at least one item
    const renderImage = () => {
        if (!pkg.mainImage || pkg.mainImage.length === 0 || !pkg.mainImage[0]) {
            return (
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image available</span>
                </div>
            );
        }

        return (
            <motion.div
                className="relative h-48 w-full mb-4 rounded-lg overflow-hidden"
                variants={imageVariants}
                transition={{ duration: 0.3 }}
            >
                <Image
                    src={pkg.mainImage[0]}
                    alt={`${pkg.id}-image`}
                    quality={100}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>
        );
    };

    return (
        <motion.div
            className={`${styles.background} p-6 rounded-lg border ${styles.border} ${styles.hoverBorder} transition-all duration-300 flex flex-col h-full relative overflow-hidden`}
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Floating badge for status */}
            {pkg.status === 'Available' && (
                <motion.div
                    className="absolute top-4 right-4 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${theme === 'light' ? 'bg-green-50 text-green-800' : 'bg-green-900 text-green-200'}`}>
                        Available
                    </span>
                </motion.div>
            )}

            {pkg.status === 'Sold' && (
                <motion.div
                    className="absolute top-4 right-4 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${theme === 'light' ? 'bg-red-100 text-red-800' : 'bg-red-900 text-red-200'}`}>
                        Sold Out
                    </span>
                </motion.div>
            )}

            <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                    <div
                        className={`w-8 h-8 rounded-full ${styles.iconBg} flex items-center justify-center`}
                    >
                        {pkg.tier === 'Residential' && (
                            <span className={`${styles.text.primary} text-lg`}>🏠</span>
                        )}
                        {pkg.tier === 'Farmland' && (
                            <span className={`${styles.text.primary} text-lg`}>🌾</span>
                        )}
                    </div>
                    <span className={`text-sm ${styles.text.tertiary} uppercase tracking-wider`}>
                        {pkg?.type} - {pkg.tier}
                    </span>
                    {pkg.tier === 'Residential' && (
                        <motion.span
                            className={`text-xs ${styles.badge} px-3 py-1 rounded-full font-medium`}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        >
                            POPULAR
                        </motion.span>
                    )}
                </div>

                {renderImage()}

                <h3 className={`text-xl font-bold ${styles.text.primary} mb-2 line-clamp-2`}>
                    {pkg.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                    <svg className={`w-4 h-4 ${styles.text.secondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h5 className={`text-sm ${styles.text.secondary} truncate`}>
                        {pkg.location}
                    </h5>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {pkg.price?.map((price, i) => (
                        <>
                            <p
                                className={`text-2xl font-extrabold ${styles.text.primary} mb-1`}
                                key={price}
                            >
                                {i === 0 ? `${price} per Plot` : `${price} per Acre`}
                            </p>
                        </>
                    ))}
                </div>
            </div>

            <motion.button
                className={`w-full mt-6 py-3 text-sm font-semibold ${styles.text.primary} bg-transparent border ${styles.border} rounded-lg ${styles.button} transition-colors duration-300 flex items-center justify-center gap-2`}
                onClick={handleClick}
                variants={buttonVariants}
                transition={{ duration: 0.2 }}
            >
                View Details
                <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                >
                    →
                </motion.span>
            </motion.button>
        </motion.div>
    );
};