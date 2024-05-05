import React from 'react'
import {GooglePay, ApplePay, CreditCard} from 'react-square-web-payments-sdk'
type Props = {}

function PayForm({}: Props) {
  return (
    <div>
      <GooglePay/>
      <ApplePay/>
      <CreditCard/>
    </div>
  )
}

export default PayForm