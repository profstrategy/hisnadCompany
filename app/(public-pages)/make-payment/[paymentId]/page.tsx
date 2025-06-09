import { PropertyEmptyState } from "@/components/reusables/empty-states";
import InitializePaymentPage from "../../_components/payment-page/initialize-payment";

export default async function MakePaymentPage({ params }: { params: Promise<{ paymentId: string }> }) {
    const awaitedParams = await params;
    const { paymentId } = awaitedParams;

    // Validate the paymentId
    if (!paymentId) {
        return <PropertyEmptyState message={' missing payment ID '} />
    }


    return (
        <section><InitializePaymentPage userId={paymentId} /></section>
    );
}