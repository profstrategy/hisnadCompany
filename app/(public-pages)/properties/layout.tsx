import { GlobalStoreProvider } from "@/providers/store-provider";

export default function PropertiesPagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <GlobalStoreProvider>
            {children}
            </GlobalStoreProvider>
        </div>
    )
}