'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AppHeading } from '@/components/reusables/app-heading';
import AppButton from '@/components/reusables/app-button';
import { SegregatedProperties } from '@/constants/types';
import { Payment_plan, sizeOptions } from '@/constants/generic';
import { addSearchParamsToUrl, formatFullNumber, formatNaira } from '@/_lib/utils';
import SingularPropertyImageContentAndFeatureSection from './singular-property-ext';
import { PaymentInitialization } from '@/_lib/client-api/initialize-payment';
import { CLIENT_ROUTES } from '@/_lib/routes';
import { AppErrorToast } from '@/components/reusables/app-toast';

type SingularPropertyProp = {
    property: SegregatedProperties | null
    userId?: string
}

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const SingularProperty = ({ property, userId }: SingularPropertyProp) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter();

    const [loadingStates, setLoadingStates] = React.useState<{
        [key: string]: boolean
    }>({});

    const propertySize = searchParams.get('size') as (typeof sizeOptions)[keyof typeof sizeOptions] || sizeOptions.PLOT;
    const paymentPlan = searchParams.get('plan') as (typeof Payment_plan)[keyof typeof Payment_plan] || Payment_plan.FULL_PAYMENT;

    const findPropertyById = property;

    const handleBtnChange = React.useCallback(async (
        size: typeof sizeOptions[keyof typeof sizeOptions],
        plan: typeof Payment_plan[keyof typeof Payment_plan]
    ) => {
        if (!findPropertyById || !userId) return;

        try {
            // Update URL first
            const newUrl = addSearchParamsToUrl(pathname, {
                size: size.toLowerCase(),
                plan: plan
            });
            router.push(newUrl);

            if (loadingStates[size]) return;
            setLoadingStates(prev => ({ ...prev, [size]: true }));

            // Initialize payment
            const response = await PaymentInitialization(userId, findPropertyById.id ?? '', size.toLowerCase());

            if (response?.success) {
                if (!response.initialized_payment_id) {
                    AppErrorToast({ message: 'We cannot find the id for this initialized payment' });
                    return;
                }
                // Navigate to payment page
                setTimeout(() => {
                    const paymentUrl = CLIENT_ROUTES.PublicPages.make_payment(
                        response.initialized_payment_id,
                        size.toLowerCase(),
                        plan
                    );
                    router.push(paymentUrl);
                }, 3000)

            } else {
                // Handle payment initialization failure
                AppErrorToast({ message: response?.message || 'Payment initialization failed' });

            }
        } catch (error) {

        } finally {
            setLoadingStates(prev => ({ ...prev, [size]: false }));
        }
    }, [pathname, router, findPropertyById, userId, loadingStates]);

    if (!property) {
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
        <motion.div
            key={findPropertyById?.title ?? 'Property Details'}
            {...fadeInUp}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        >
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
                        {findPropertyById?.title ?? 'Property Title Not Available'}
                    </AppHeading>

                    <p className="text-gray-600 text-sm sm:text-base">{findPropertyById?.location ?? ''}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-blue-50 text-blue-800 rounded-full">
                            {findPropertyById?.category ?? 'Category Not Available'}
                        </span>
                        <span className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${findPropertyById?.status === 'Available'
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                            }`}>
                            {findPropertyById?.status}
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col gap-4 md:w-1/3"
                >
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium capitalize mb-4 text-center">
                            Available Options
                        </h3>

                        <div className="space-y-4">
                            {findPropertyById?.type === 'Featured_Farmland' ? (
                                <>
                                    {/* Acre Option */}
                                    {findPropertyById?.featured_farmland_amount_acre && (
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="text-center mb-3">
                                                <p className="text-lg font-semibold text-gray-900 mb-1">
                                                    {formatNaira(findPropertyById?.featured_farmland_amount_acre, { decimals: 1 })}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    per {sizeOptions.ACRE.toLowerCase()}
                                                </p>
                                            </div>
                                            <AppButton
                                                className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                                                onClick={() => handleBtnChange(sizeOptions.ACRE, Payment_plan.FULL_PAYMENT)}
                                                disabled={loadingStates[sizeOptions.ACRE]}
                                            >
                                                {loadingStates[sizeOptions.ACRE] ? 'Processing...' : `Buy ${sizeOptions.ACRE}`}
                                            </AppButton>
                                        </div>
                                    )}

                                    {/* Plot Option */}
                                    {findPropertyById?.featured_farmland_amount_plot && (
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="text-center mb-3">
                                                <p className="text-lg font-semibold text-gray-900 mb-1">
                                                    {formatNaira(findPropertyById?.featured_farmland_amount_plot, { decimals: 1 })}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    per {sizeOptions.PLOT.toLowerCase()}
                                                </p>
                                            </div>
                                            <AppButton
                                                className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                                                onClick={() => handleBtnChange(sizeOptions.PLOT, Payment_plan.FULL_PAYMENT)}
                                                disabled={loadingStates[sizeOptions.PLOT]}
                                            >
                                                {loadingStates[sizeOptions.PLOT] ? 'Processing...' : `Buy ${sizeOptions.PLOT}`}
                                            </AppButton>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Hisnad Estate Plot Option */}
                                    {findPropertyById?.hisnad_estate_amount_plot && (
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="text-center mb-3">
                                                <p className="text-lg font-semibold text-gray-900 mb-1">
                                                    {`${formatNaira(findPropertyById?.hisnad_estate_amount_plot, { decimals:1 })}`}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    per {sizeOptions.PLOT.toLowerCase()}
                                                </p>
                                            </div>
                                            <AppButton
                                                className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                                                onClick={() => handleBtnChange(sizeOptions.PLOT, Payment_plan.FULL_PAYMENT)}
                                                disabled={loadingStates[sizeOptions.PLOT]}
                                            >
                                                {loadingStates[sizeOptions.PLOT] ? 'Processing...' : `Buy ${sizeOptions.PLOT}`}
                                            </AppButton>
                                        </div>
                                    )}

                                    {/* Hisnad Estate Acre Option */}
                                    {findPropertyById?.hisnad_estate_amount_acre && (
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="text-center mb-3">
                                                <p className="text-lg font-semibold text-gray-900 mb-1">
                                                    {`${formatNaira(findPropertyById?.hisnad_estate_amount_acre, { decimals:1 })}`}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    per {sizeOptions.ACRE.toLowerCase()}
                                                </p>
                                            </div>
                                            <AppButton
                                                className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                                                onClick={() => handleBtnChange(sizeOptions.ACRE, Payment_plan.FULL_PAYMENT)}
                                                disabled={loadingStates[sizeOptions.ACRE]}
                                            >
                                                {loadingStates[sizeOptions.ACRE] ? 'Processing...' : `Buy ${sizeOptions.ACRE}`}
                                            </AppButton>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <SingularPropertyImageContentAndFeatureSection findPropertyById={findPropertyById} />
        </motion.div>
    );
}

export default SingularProperty;