import { CompleteOnboardingApiResponse, ConfirmedUserApiResponse } from "@/constants/types"
import { createStore } from 'zustand/vanilla'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
   context: {
    confirmedUserData: ConfirmedUserApiResponse | null
    },
    // save: {
    //      registeredEmail: string | null
    // }
    completedOnboardingData: CompleteOnboardingApiResponse | null
}


type Action = {
   actions : { 
    setConfirmedUserData: (data: State['context']['confirmedUserData']) => void,
    // setRegisteredEmail: (data: State['save']['registeredEmail']) => void
   },
   // Non-persisted actions
   setCompletedOnboardingData: (data: State['completedOnboardingData']) => void
}

export type Store = State & Action;

export const createExternalStateGlobalStore = () => createStore<Store>()(
    persist(
    (set) => ({
    // Initial state
    context: {
        confirmedUserData: null,
    },
    save: {
         registeredEmail: null
    },
    completedOnboardingData: null,
    actions: {
        setConfirmedUserData: (confirmedUserData) => set((state) => ({
            context: { 
                ...state.context,
                confirmedUserData 
            }
        })),
        // setRegisteredEmail: (registeredEmail) => set((state) => ({
        //     save: { 
        //         ...state.save,
        //         registeredEmail 
        //     }
        // }))
    },
    setCompletedOnboardingData: (completedOnboardingData) => set({ completedOnboardingData })
}), {
    name: 'email-confirmation-data',
    partialize: (state) => ({ context: state.context }),
    version: 1,
    storage: createJSONStorage(() => sessionStorage)
}))