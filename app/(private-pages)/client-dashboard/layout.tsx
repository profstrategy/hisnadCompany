import { AppSidebarClient } from "@/components/layout/app-client-sidebar";
import ReactQueryProvider from "@/providers/query-client";

export default async function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <AppSidebarClient>{children}</AppSidebarClient>
        </ReactQueryProvider>
    )
}
