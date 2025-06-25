import { AppSidebarClient } from "@/components/layout/app-client-sidebar";

export default async function DashboardLayoutClient({children}: {children: React.ReactNode}){
    return<AppSidebarClient>{children}</AppSidebarClient>
}
