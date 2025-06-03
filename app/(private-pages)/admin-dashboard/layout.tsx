import { checkAuth } from "@/_lib/utils"
import { ACCOUNT_TYPE } from "@/constants/generic"

export default async function DashboardLayoutAdmin({ children }: { children: React.ReactNode }) {
    await checkAuth({ pageType: ACCOUNT_TYPE.ADMIN })
    return <div>{children}</div>
}
