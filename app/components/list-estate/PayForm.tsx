'use client';
import React from 'react'
type Props = {}
import { CreditCard, GooglePay } from 'react-square-web-payments-sdk';

function PayForm({}: Props) {

  return (
    <div className='max-w-md mx-auto m-0 flex flex-col gap-4 w-full p-2 rounded-lg bg-darkGray'>
      <p>In order to continue, you have to pay the fee.</p>
      <GooglePay buttonColor="black"/>
     <CreditCard>Pay 20$ fee</CreditCard>
    </div>
  )
}

export default PayForm