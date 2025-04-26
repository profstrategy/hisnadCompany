import React from 'react'
import SingularProperty from '../../_components/properties-page/singular-property'

const SingularPropertiesPage = ({ params}: { params: { propertiesId: string } }) => {
  return (
    <div><SingularProperty id={params.propertiesId} /></div>
  )
}

export default SingularPropertiesPage
