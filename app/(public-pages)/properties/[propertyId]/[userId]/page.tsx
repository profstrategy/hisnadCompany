import { getUserOnboardingStatus } from "@/_lib/data-service";
import { getSingularProperty } from "@/_lib/prisma-data-service";
import SingularProperty from "@/app/(public-pages)/_components/properties-page/singular-property";
import SingularPropertySkeleton from "@/app/(public-pages)/_components/properties-page/singular-property-skeleton";
import { PropertyEmptyState } from "@/components/reusables/empty-states";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Params {
  propertyId: string;
  userId: string;
}

export default async function AuthenticatedPropertiesPage({
  params
}: {
  params: Promise<Params>
}) {
  const awaitedParams = await params;
  const { propertyId, userId } = awaitedParams;

  const userStatus = await getUserOnboardingStatus(userId)

  console.log('User Status:', userStatus?.id);
  
  // Security check: ensure the userId in URL matches the session user
  if (!userStatus?.id || userStatus.id !== userId || userStatus.status === 'pending') {
    // Redirect to the non-authenticated version
    redirect(`/properties/${propertyId}`);
  }
  
  // First validate the params
  if (!propertyId) {
    console.log('Missing property ID');
    return <PropertyEmptyState message={'Missing property ID'} key={propertyId} />
  }

  // Then fetch the data
  const property = await getSingularProperty(propertyId);

  if (!property) {
    return <PropertyEmptyState message={'Property not found'} key={propertyId} />
  }

  
  // This page handles authenticated users with proper onboarding
  return (
    <Suspense fallback={<SingularPropertySkeleton />} key={propertyId}>
      <SingularProperty 
        property={property} 
        userId={userStatus.id}
        key={propertyId} 
      />
    </Suspense>
  )
}