
// import { getSubscriptionByInitializedPaymentId } from "@/_lib/supabse-data-service";
// import InitializePaymentPage from "@/app/(public-pages)/_components/payment-page/initialize-payment";
// import InitializePaymentPageSkeleton from "@/app/(public-pages)/_components/payment-page/make-payment-skeleton";
// import { PropertyEmptyState } from "@/components/reusables/empty-states";
// import { Subscriptions } from "@/constants/types";
// import { useParams } from "next/navigation";
// import React from "react";

// export const useSubscriptionByPaymentId = (paymentId: string) => {
//     const [subscription, setSubscription] = React.useState<Subscriptions | null>(null);
//     const [loading, setLoading] = React.useState(true);
//     const [error, setError] = React.useState<string | null>(null);

//     React.useEffect(() => {
//         const fetchSubscription = async () => {
//             if (!paymentId) {
//                 setError('Missing payment ID');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 setLoading(true);
//                 const data = await getSubscriptionByInitializedPaymentId(paymentId);
//                 setSubscription(data);
//                 setError(null);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
//                 setSubscription(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSubscription();
//     }, [paymentId]);

//     return { subscription, loading, error };
// };

// export function MakePaymentPageWithHook() {
//     const params = useParams();
//     const initializedPaymentId = params.initializedPaymentId as string;
    
//     const { subscription, loading, error } = useSubscriptionByPaymentId(initializedPaymentId);

//     if (loading) {
//         return (
//             <section>
//                 <InitializePaymentPageSkeleton />
//             </section>
//         );
//     }

//     if (error || !subscription) {
//         return (
//             <section>
//                 <PropertyEmptyState 
//                     message={error || 'Subscription not found'} 
//                 />
//             </section>
//         );
//     }

//     return (
//         <section>
//             <InitializePaymentPage initialized_sub={subscription} />
//         </section>
//     );
// }