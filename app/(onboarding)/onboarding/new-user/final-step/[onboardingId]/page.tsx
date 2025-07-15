import React from 'react'
import OnboardingFinalStep from '@/app/(public-pages)/_components/onboarding-page/final-step'
import { PropertyEmptyState } from '@/components/reusables/empty-states'
import { Metadata } from 'next'

const OnboardingFinalStepPage = async ({ params } : { params:Promise<{ onboardingId: string }> }) => {
 const awaitedUserId = await params
 const { onboardingId } = awaitedUserId
 if (!onboardingId) {
  return <PropertyEmptyState message={'Missing user ID'} key={onboardingId} />
 }

  return (
    <section><OnboardingFinalStep onboardingId={ onboardingId }/></section>

  )
}

export default OnboardingFinalStepPage

export const metadata: Metadata = {
  title: 'Complete Your Profile | Final-step',
  description:
    'Complete your profile setup and preferences to get started with our platform.',
  keywords: 'profile setup, onboarding, registration, final-step',
};
