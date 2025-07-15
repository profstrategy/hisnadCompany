

import OnboardingInitialStep from '@/app/(public-pages)/_components/onboarding-page/initial-step'
import { logo } from '@/public'
import { Metadata } from 'next'
import React from 'react'

const OnboardingInitialStepPage = () => {
  return (
    <section><OnboardingInitialStep /></section>
  )
}

export default OnboardingInitialStepPage

export const metadata: Metadata = {
  title: 'Complete Your Profile | Initial-step',
  icons: './logo.png',
  description:
    'Complete your profile setup and preferences to get started with our platform.',
  keywords: 'profile setup, onboarding, registration, iinal-step',
};