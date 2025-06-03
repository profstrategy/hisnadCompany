import { checkAuth } from "@/_lib/utils"
import { ACCOUNT_TYPE } from "@/constants/generic"

export default async function DashboardLayoutClient({children}: {children: React.ReactNode}){
await checkAuth({ pageType: ACCOUNT_TYPE.USER })
    return<div>{children}</div>
}
