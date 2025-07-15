'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { PaymentInitializationResponse, SegregatedProperties } from '@/constants/types';
import { Payment_plan, sizeOptions } from '@/constants/generic';
import SingularPropertyImageContentAndFeatureSection from './singular-property-ext';
import PropertyHeader from './property-header';
import PropertyPaymentOptions from './property-payment-options';
import { usePropertyPaymentHandler } from '@/hooks/usePropertyPaymentHandler';

type SingularPropertyProp = {
    property: SegregatedProperties | null;
    userId?: string;
    paymentInitializationResponse?: PaymentInitializationResponse | null;
};

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

const SingularProperty = ({
    property,
    userId,
    paymentInitializationResponse
}: SingularPropertyProp) => {
    const searchParams = useSearchParams();

    searchParams.get('size') as (typeof sizeOptions)[keyof typeof sizeOptions] || sizeOptions.PLOT;
    searchParams.get('plan') as (typeof Payment_plan)[keyof typeof Payment_plan] || Payment_plan.FULL_PAYMENT;

    const {
        // state
        loadingStates,
        // Handlers
        handleBtnChange,
    } = usePropertyPaymentHandler({
        property,
        userId,
        paymentInitializationResponse
    });

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
            key={property?.title ?? 'Property Details'}
            {...fadeInUp}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        >
            {/* Main Content */}
            <motion.div
                className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-8"
                variants={staggerChildren}
            >
                {/* Header with Back Button and Property Info */}
                <PropertyHeader property={property} />

                {/* Payment Options */}
                <PropertyPaymentOptions
                userId={userId}
                    property={property}
                    loadingStates={loadingStates}
                    onBtnChange={handleBtnChange}
                />
            </motion.div>

            {/* Image Content and Feature Section */}
            <SingularPropertyImageContentAndFeatureSection findPropertyById={property} />
        </motion.div>
    );
};

export default SingularProperty;