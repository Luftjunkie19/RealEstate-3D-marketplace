'use client';
import React from 'react'
type Props = {}
import { CreditCard } from 'react-square-web-payments-sdk';

function PayForm({}: Props) {

  return (
    <div className='max-w-md mx-auto m-0 flex flex-col gap-4 w-full p-2 rounded-lg bg-darkGray'>
      <p>In order to continue, go to the checkout</p>

     <CreditCard/>
    </div>
  )
}

export default PayForm