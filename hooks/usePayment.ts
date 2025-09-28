// import { getSubscriptionByInitializedPaymentId } from "@/_lib/prisma-data-service"
// import { formatFullNumber } from "@/_lib/utils"
// import { Payment_plan } from "@/constants/generic"
// import { useGlobalStore } from "@/providers/store-provider"
// import { useSearchParams } from "next/navigation"
// import React from "react"

// export const usePayment = ({amount}:{ amount:number | undefined }) => {
//     const [isInstallment, setIsInstallment] = React.useState<boolean>(false)
//     const [installment, setInstallment] = React.useState<string>()

//     // update URL as amount changes
//     useSearchParams().get('plan') as (typeof Payment_plan[keyof typeof Payment_plan]) || Payment_plan.FULL_PAYMENT

//     // calculate installment and full paymenty
//     const installmentAmount = formatFullNumber(amount ?? 0 * 0.5, 'NGN', 'en-NG')
//     const fullAmount = formatFullNumber(amount, 'NGN', 'en-NG')

//     return { isInstallment, installment, installmentAmount, fullAmount, setInstallment, setIsInstallment }
// }