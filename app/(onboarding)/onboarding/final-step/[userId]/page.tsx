import React from 'react'
import OnboardingFinalStep from '@/app/(public-pages)/_components/onboarding-page/final-step'
import { PropertyEmptyState } from '@/components/reusables/empty-states'

const OnboardingFinalStepPage = async ({ params } : { params:Promise<{ userId: string }> }) => {
 const awaitedUserId = await params
 const { userId } = awaitedUserId
 console.log('page id:', userId)
 if (!userId) {
  return <PropertyEmptyState message={'Missing user ID'} key={userId} />
 }
  return (
    <section><OnboardingFinalStep userId={ userId } /></section>
  )
}

export default OnboardingFinalStepPage