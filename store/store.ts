import { CompleteOnboardingApiResponse, RegisterEmailApiResponse } from "@/constants/types"
import { createStore } from 'zustand/vanilla'

type State = {
    registeredEmailData: RegisterEmailApiResponse | null
    completedOnboardingData: CompleteOnboardingApiResponse | null
    
    isRegisteringEmail: boolean
    isCompletingOnboarding: boolean
    
    registerEmailError: string | null
    completeOnboardingError: string | null
}

type Action = {
    setRegisteredEmailData: (data: RegisterEmailApiResponse | null) => void
    setCompletedOnboardingData: (data: CompleteOnboardingApiResponse | null) => void
    
    setRegisteringEmail: (loading: boolean) => void
    setCompletingOnboarding: (loading: boolean) => void

    setRegisterEmailError: (error: string | null) => void
    setCompleteOnboardingError: (error: string | null) => void
    
    clearRegisteredEmailData: () => void
    clearCompletedOnboardingData: () => void
}

export type Store = State & Action;

export const createExternalStateGlobalStore = () => createStore<Store>()((set) => ({
    // Initial state
    registeredEmailData: null,
    completedOnboardingData: null,
    isRegisteringEmail: false,
    isCompletingOnboarding: false,
    registerEmailError: null,
    completeOnboardingError: null,
    
    // Actions
    setRegisteredEmailData: (data) => set({ registeredEmailData: data }),
    setCompletedOnboardingData: (data) => set({ completedOnboardingData: data }),
    setRegisteringEmail: (loading) => set({ isRegisteringEmail: loading }),
    setCompletingOnboarding: (loading) => set({ isCompletingOnboarding: loading }),
    setRegisterEmailError: (error) => set({ registerEmailError: error }),
    setCompleteOnboardingError: (error) => set({ completeOnboardingError: error }),
    clearRegisteredEmailData: () => set({ registeredEmailData: null, registerEmailError: null }),
    clearCompletedOnboardingData: () => set({ completedOnboardingData: null, completeOnboardingError: null }),
}))