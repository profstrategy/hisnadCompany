'use client'

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PaymentInitializationResponse, SegregatedProperties } from '@/constants/types';
import { Payment_plan, sizeOptions } from '@/constants/generic';
import { addSearchParamsToUrl } from '@/_lib/utils';
import { CLIENT_ROUTES } from '@/_lib/routes';
import { PaymentInitialization } from '@/api/client-api/initialize-payment';

type UsePropertyPaymentHandlerProps = {
  property: SegregatedProperties | null;
  userId?: string;
  paymentInitializationResponse?: PaymentInitializationResponse | null;
};

export function usePropertyPaymentHandler({
  property,
  userId,
  paymentInitializationResponse
}: UsePropertyPaymentHandlerProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isInCompletePaymentModal, setIsInCompletePaymentModal] = React.useState(false);
  const [isActivatedUserAccount, setIsActivateUserAccount] = React.useState(false);
  const [isForcePropertyPurchase, setIsForcePropertyPurchase] = React.useState(false);
  const [isExceedLimit, setIsExceedLimit] = React.useState(false);

  const [loadingStates, setLoadingStates] = React.useState<{
    [key: string]: boolean
  }>({});

  const handleBtnChange = React.useCallback(async (
    size: typeof sizeOptions[keyof typeof sizeOptions],
    plan: typeof Payment_plan[keyof typeof Payment_plan]
  ) => {
    if (!property || !userId) return;

    try {
      // Update URL first
      const newUrl = addSearchParamsToUrl(pathname, {
        size: size.toLowerCase(),
        plan: plan
      });
      router.push(newUrl);

      if (loadingStates[size]) return;
      setLoadingStates(prev => ({ ...prev, [size]: true }));

      // Initialize payment using the extracted function
      const response = await PaymentInitialization(userId, property.id || '', size);

      if (!response) return;

      if (response.isCompletePaymentModal) {
        return setIsInCompletePaymentModal(true);
      }

      if (response.redirectToRegister) {
        return router.push(CLIENT_ROUTES.PublicPages.onboarding.initialStep);
      }

      if (response.isActivateAccount) {
        return setIsActivateUserAccount(true);
      }

      if (response.isForcePropertyPurchase) {
        return setIsForcePropertyPurchase(true);
      }

      if (response.success) {
        if (!response.initialized_payment_id) {
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
        }, 3000);
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [size]: false }));
    }
  }, [pathname, router, property, userId, loadingStates]);

  const handleCompletePaymentModal = () => {
    return router.push(
      CLIENT_ROUTES.PublicPages.make_payment(
        paymentInitializationResponse?.initialized_payment_id ?? '',
        property?.size ?? '',
        paymentInitializationResponse?.size ?? ''
      )
    );
  };

  const handleActivateUserAccount = () => {
    // logic for magic link here
    console.log('Activating user account...');
  };

  return {
    // State
    isInCompletePaymentModal,
    setIsInCompletePaymentModal,
    isActivatedUserAccount,
    setIsActivateUserAccount,
    isForcePropertyPurchase,
    setIsForcePropertyPurchase,
    isExceedLimit,
    setIsExceedLimit,
    loadingStates,
    
    // Handlers
    handleBtnChange,
    handleCompletePaymentModal,
    handleActivateUserAccount,
  };
}