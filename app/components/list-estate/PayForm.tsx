import React from 'react'
import {GooglePay, ApplePay, CreditCard} from 'react-square-web-payments-sdk'
type Props = {}

function PayForm({}: Props) {
  return (
    <div className='max-w-md mx-auto m-0 flex flex-col gap-4 w-full p-2 rounded-lg bg-darkGray'>
      {/* <GooglePay/>
      <ApplePay/> */}
      <CreditCard includeInputLabels  postalCode="12345" />
    </div>
  )
}

export default PayForm