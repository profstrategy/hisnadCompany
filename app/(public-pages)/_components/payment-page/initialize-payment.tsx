import React from 'react'
interface InitializePaymentPageProps {
    userId: string
}
const InitializePaymentPage = ({ userId }:InitializePaymentPageProps) => {
  return (
    <div>InitializePaymentPage:  Pay your money!!! {userId}</div>
  )
}

export default InitializePaymentPage