import React from 'react'
import {CreditCard} from 'react-square-web-payments-sdk'
type Props = {
    selectedPlanId:string,
}

function Checkout({selectedPlanId}: Props) {
  return (
    <div className='max-w-7xl w-full flex gap-4 p-4'>
        <div className="flex flex-col gap-2 max-w-xs w-full">
        <CreditCard>
        Start Subscribing
        </CreditCard>
        </div>

        
    </div>
  )
}

export default Checkout