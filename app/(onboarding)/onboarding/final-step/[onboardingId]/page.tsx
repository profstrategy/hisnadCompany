import React from 'react'
import OnboardingFinalStep from '@/app/(public-pages)/_components/onboarding-page/final-step'
import { PropertyEmptyState } from '@/components/reusables/empty-states'

const OnboardingFinalStepPage = async ({ params, productSlug } : { params:Promise<{ onboardingId: string }>, productSlug:string }) => {
 const awaitedUserId = await params
 const { onboardingId } = awaitedUserId
 if (!onboardingId) {
  return <PropertyEmptyState message={'Missing user ID'} key={onboardingId} />
 }
  return (
    <section><OnboardingFinalStep onboardingId={ onboardingId } productSlug={productSlug} /></section>

  )
}

export default OnboardingFinalStepPage