import { PropertyEmptyState } from "@/components/reusables/empty-states";
import InitializePaymentPage from "../../_components/payment-page/initialize-payment";
import { getSubscriptionByInitializedPaymentId } from "@/_lib/prisma-data-service";
import { PaymentInitialization } from "@/api/client-api/initialize-payment";


export default async function MakePaymentPage({ params }: { params: Promise<{ initializedPaymentId: string }> }) {
    const awaitedParams = await params;
    const { initializedPaymentId } = awaitedParams;
    console.log(initializedPaymentId)
    const initialized_subscription = await getSubscriptionByInitializedPaymentId(initializedPaymentId);

    // Validate the initializedPaymentId
    if (!initializedPaymentId || !initialized_subscription) {
        return <PropertyEmptyState message={' missing payment ID '} />
    }


    return (
        <section><InitializePaymentPage initialized_sub={initialized_subscription} /></section>
    );
}