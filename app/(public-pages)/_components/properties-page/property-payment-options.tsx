'use client'

import React from 'react';
import { motion } from 'framer-motion';
import AppButton from '@/components/reusables/app-button';
import { SegregatedProperties } from '@/constants/types';
import { Payment_plan, sizeOptions } from '@/constants/generic';
import { formatNaira } from '@/_lib/utils';

type PropertyPaymentOptionsProps = {
  property: SegregatedProperties;
  loadingStates: { [key: string]: boolean };
  onBtnChange: (
    size: typeof sizeOptions[keyof typeof sizeOptions],
    plan: typeof Payment_plan[keyof typeof Payment_plan]
  ) => void;
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PropertyPaymentOptions({
  property,
  loadingStates,
  onBtnChange
}: PropertyPaymentOptionsProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col gap-4 md:w-1/3"
    >
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-medium capitalize mb-4 text-center">
          Available Options
        </h3>

        <div className="space-y-4">
          {property?.type === 'Featured_Farmland' ? (
            <>
              {/* Acre Option */}
              {property?.featured_farmland_amount_acre && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-center mb-3">
                    <p className="text-lg font-semibold text-gray-900 mb-1">
                      {formatNaira(property?.featured_farmland_amount_acre, { decimals: 1 })}
                    </p>
                    <p className="text-sm text-gray-600">
                      per {sizeOptions.ACRE.toLowerCase()}
                    </p>
                  </div>
                  <AppButton
                    className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                    onClick={() => onBtnChange(sizeOptions.ACRE, Payment_plan.FULL_PAYMENT)}
                    disabled={loadingStates[sizeOptions.ACRE.toLowerCase()]}
                  >
                    {loadingStates[sizeOptions.ACRE] ? 'Processing...' : `Buy ${sizeOptions.ACRE}`}
                  </AppButton>
                </div>
              )}

              {/* Plot Option */}
              {property?.featured_farmland_amount_plot && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-center mb-3">
                    <p className="text-lg font-semibold text-gray-900 mb-1">
                      {formatNaira(property?.featured_farmland_amount_plot, { decimals: 1 })}
                    </p>
                    <p className="text-sm text-gray-600">
                      per {sizeOptions.PLOT.toLowerCase()}
                    </p>
                  </div>
                  <AppButton
                    className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                    onClick={() => onBtnChange(sizeOptions.PLOT, Payment_plan.FULL_PAYMENT)}
                    disabled={loadingStates[sizeOptions.PLOT.toLowerCase()]}
                  >
                    {loadingStates[sizeOptions.PLOT] ? 'Processing...' : `Buy ${sizeOptions.PLOT}`}
                  </AppButton>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Hisnad Estate Plot Option */}
              {property?.hisnad_estate_amount_plot && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-center mb-3">
                    <p className="text-lg font-semibold text-gray-900 mb-1">
                      {`${formatNaira(property?.hisnad_estate_amount_plot, { decimals: 1 })}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      per {sizeOptions.PLOT.toLowerCase()}
                    </p>
                  </div>
                  <AppButton
                    className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                    onClick={() => onBtnChange(sizeOptions.PLOT, Payment_plan.FULL_PAYMENT)}
                    disabled={loadingStates[sizeOptions.PLOT]}
                  >
                    {loadingStates[sizeOptions.PLOT] ? 'Processing...' : `Buy ${sizeOptions.PLOT}`}
                  </AppButton>
                </div>
              )}

              {/* Hisnad Estate Acre Option */}
              {property?.hisnad_estate_amount_acre && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-center mb-3">
                    <p className="text-lg font-semibold text-gray-900 mb-1">
                      {`${formatNaira(property?.hisnad_estate_amount_acre, { decimals: 1 })}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      per {sizeOptions.ACRE.toLowerCase()}
                    </p>
                  </div>
                  <AppButton
                    className="w-full text-white bg-primary hover:bg-primary-dark transition-colors"
                    onClick={() => onBtnChange(sizeOptions.ACRE, Payment_plan.FULL_PAYMENT)}
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
  );
}