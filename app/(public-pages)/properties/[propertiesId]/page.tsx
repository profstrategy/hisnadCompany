import { getSingularProperty } from '@/api'
import { PropertyEmptyState } from '@/components/reusables/empty-states'
import { Suspense } from 'react'
import SingularPropertySkeleton from '../../_components/properties-page/singular-property-skeleton'
import SingularProperty from '../../_components/properties-page/singular-property'

export default async function SingularPropertiesPage({
  params,
}: {
  params: { propertiesId: string }
}) {

  const { propertiesId } = await params
  // First validate the params
  if (!propertiesId) {
    return <PropertyEmptyState message={'Missing property ID'} key={propertiesId} />
  }

  // Then fetch the data
  const property = await getSingularProperty(propertiesId)

  if (!property) {
    return <PropertyEmptyState message={'Property not found'} key={propertiesId} />
  }

  return (
    <Suspense fallback={<SingularPropertySkeleton />} key={propertiesId}>
      <SingularProperty property={property} key={propertiesId} />
    </Suspense>
  )
}