'use client';

import { createExternalStateGlobalStore, Store } from "@/store/store";
import { useStore } from 'zustand'
import React, { createContext, useContext, useRef } from "react";

type StoreApi = ReturnType<typeof createExternalStateGlobalStore>;

const StoreContext = createContext<StoreApi | null>(null);

type GlobalStoreProviderProps = {
    children: React.ReactNode
}

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
    const storeRef = useRef<StoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = createExternalStateGlobalStore();
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}

export const useGlobalStore = <T,>(selector: (store: Store) => T): T => {
    const storeContext = useContext(StoreContext);

    if (!storeContext) {
        throw new Error('useGlobalStore must be used within GlobalStoreProvider')
    }

    return useStore(storeContext, selector)
}