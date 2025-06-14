// app/properties/[slug]/page.tsx
import { getSingularProperty } from "@/_lib/prisma-data-service";
import SingularProperty from "@/app/(public-pages)/_components/properties-page/singular-property";
import SingularPropertySkeleton from "@/app/(public-pages)/_components/properties-page/singular-property-skeleton";
import { PropertyEmptyState } from "@/components/reusables/empty-states";
import { Suspense } from "react";

interface Params {
  slug: string;
}

export default async function BasePropertiesPage({
  params
}: {
  params: Promise<Params>
}) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  

  // validate the params
  if (!slug) {
    return <PropertyEmptyState message={'Missing property ID'} key={slug} />
  }

  // this is to get the slug from array of property properties
  const property = await getSingularProperty(slug);

  if (!property) {
    return <PropertyEmptyState message={'Property not found'} key={slug} />
  }

  return (
    <Suspense fallback={<SingularPropertySkeleton />} key={slug}>
      <SingularProperty property={property} key={slug} />
    </Suspense>
  )
}