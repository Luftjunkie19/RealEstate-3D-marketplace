'use client';
import React, { useEffect, useState } from 'react'
type Props = {selectedOption:number | null}
import { CreditCard, GooglePay } from 'react-square-web-payments-sdk';

function PayForm({selectedOption}: Props) {
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    /** Wait for 1 second for Square payment form initialisation */
    const timer = setTimeout(() => setIsMount(true), 1000);
    return () => {
      clearTimeout(timer);
      setIsMount(false);
    };
  }, []);


  return (
    <div className='max-w-md mx-auto m-0 flex flex-col gap-4 w-full p-2 rounded-lg bg-darkGray'>
      <p>In order to continue, you have to pay the fee.</p>
     {isMount && <GooglePay buttonColor="black"/>}
      {isMount ? (<CreditCard>Pay {selectedOption !== null ? (20 + (selectedOption)).toFixed(2) : 20}$ fee</CreditCard>) : (<></>)}
    </div>
  )
}

export default PayForm