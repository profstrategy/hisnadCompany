// app/properties/[propertyId]/page.tsx
import { getSingularProperty } from "@/_lib/prisma-data-service";
import SingularProperty from "@/app/(public-pages)/_components/properties-page/singular-property";
import SingularPropertySkeleton from "@/app/(public-pages)/_components/properties-page/singular-property-skeleton";
import { PropertyEmptyState } from "@/components/reusables/empty-states";
import { Suspense } from "react";

interface Params {
  propertyId: string;
}

export default async function BasePropertiesPage({
  params
}: {
  params: Promise<Params>
}) {
  const awaitedParams = await params;
  const { propertyId } = awaitedParams;
  

  // validate the params
  if (!propertyId) {
    return <PropertyEmptyState message={'Missing property ID'} key={propertyId} />
  }

  // this is to get the slug from array of property properties
  const property = await getSingularProperty(propertyId);

  if (!property) {
    return <PropertyEmptyState message={'Property not found'} key={propertyId} />
  }

  return (
    <Suspense fallback={<SingularPropertySkeleton />} key={propertyId}>
      <SingularProperty property={property} key={propertyId} />
    </Suspense>
  )
}