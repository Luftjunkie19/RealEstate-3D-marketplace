'use client';

import { PaymentForm } from 'react-square-web-payments-sdk';
import React, { useCallback, useEffect, useState } from 'react'
import Checkout from './offers-section/Checkout';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import { createCardItem, createOrder, createSubscription } from '@/utils/square/server';
type Props = {}



function OfferPlans({}: Props) {
    const [planOffer, setPlanOffer]=useState<string | null>(null);
    const [variationPlanId, setVariationPlanId]=useState<string | null>(null);

    const {user:userData}=useAuthContext();
    const [user, setUser] = useState<any>(null);

    const getUserData = useCallback(()=>{
        supabase.from('users').select('*').eq('user_id', userData?.id).limit(1).then((response)=>{
            if(response.data && response.data?.length > 0){
                setUser(response.data[0]);
            }
        });
    }, [userData?.id]);
  
    useEffect(()=>{
      getUserData();
    },[getUserData]);

  return (
    <PaymentForm cardTokenizeResponseReceived={async (token)=>{
        console.log(token, user.square_customer.customer);
       if(token.details && user && user.square_customer.customer){
           const createdCardObj= await createCardItem(user.square_customer.customer.id, "John Doe", token.details.card.expYear, token.details.card.expMonth, token.token);
           if(!user.customer_card_details && createdCardObj.result.card){
            await supabase.from('users').update({customer_card_details:createdCardObj.result.card}).eq('user_id', userData?.id);
           }
           if(user && user.square_customer.customer.id){
               const order= await createOrder(user.square_customer.customer.id as string, planOffer as string);
               console.log('order', order);
               const subscription = await createSubscription(user.square_customer.customer.id, (order as any).id, variationPlanId as string, createdCardObj.result.card!.id as string, 0);
             console.log(subscription);
               if(!user.subscribtion_details && subscription.subscription){
                await supabase.from('users').update({subscribtion_details:subscription.subscription}).eq('user_id', userData!.id);
                await supabase.from('users').update({is_subscribed:true}).eq('user_id', userData!.id);
               }

            }
           

        }
    }} locationId={process.env.NEXT_PUBLIC_SQUARE_APP_SEC} applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID}>
    {planOffer ? <Checkout selectedPlanId={planOffer}/> : <div className='max-w-7xl mx-auto m-0 flex gap-4 items-center justify-around p-4'>
        <div className="p-4 flex flex-col w-full gap-4 bg-darkGray max-w-xs border border-purple rounded-lg">
            <p className='text-2xl text-white font-semibold'>VirtuEstate Weekly Plan</p>
            <ul className="flex flex-col gap-3 ">
                <li className='text-white font-bold'>* Access to our AI Chat</li>
                <li className='text-white font-bold'>* Discounted listing&apos;s price</li>
            </ul>
            <div className="flex gap-4 items-center justify-around">
    <p className='text-white font-bold'>9.99$ / week</p>
    <button onClick={()=>{
        console.log(process.env.NEXT_PUBLIC_WEEKLY_PRICE, process.env.NEXT_PUBLIC_VARIATION_WEEK_ITEM);
        setPlanOffer(process.env.NEXT_PUBLIC_WEEKLY_PRICE as string);
        setVariationPlanId(process.env.NEXT_PUBLIC_VARIATION_WEEK_ITEM as string);
        }} className='bg-purple p-[0.375rem] rounded-lg text-white'>Purchase</button>
</div>
        </div>

        <div className="p-4 flex flex-col gap-4 w-full bg-darkGray max-w-xs border border-purple rounded-lg">
            <p className='text-2xl text-white font-semibold'>VirtuEstate Monthly Plan</p>
            <ul className="flex flex-col gap-3 ">
                <li className='text-white font-bold'>* Access to our AI Chat</li>
                <li className='text-white font-bold'>* Discounted listing&apos;s price</li>
            </ul>
            <div className="flex gap-4 items-center justify-around">
    <p className='text-white font-bold'>20.99$ / month</p>
    <button onClick={()=>{
        console.log(process.env.NEXT_PUBLIC_MONTHLY_PRICE, process.env.NEXT_PUBLIC_VARIATION_MONTH_ITEM);
        setPlanOffer(process.env.NEXT_PUBLIC_MONTHLY_PRICE as string);
        setVariationPlanId(process.env.NEXT_PUBLIC_VARIATION_MONTH_ITEM as string);
    }} className='bg-purple p-[0.375rem] rounded-lg text-white'>Purchase</button>
</div>
        </div>
        
        <div className="p-4 bg-darkGray w-full flex flex-col gap-4 max-w-xs border border-purple rounded-lg">
            <p className='text-2xl text-white font-semibold'>VirtuEstate Yearly Plan</p>
            <ul className="flex flex-col gap-3 ">
                <li className='text-white font-bold'>* Access to our AI Chat</li>
                <li className='text-white font-bold'>* Discounted listing&apos;s price</li>
            </ul>
<div className="flex gap-4 items-center justify-around">
    <p className='text-white font-bold'>249.99$ / year</p>
    <button onClick={()=>{
        console.log(process.env.NEXT_PUBLIC_ANNUAL_PRICE, process.env.NEXT_PUBLIC_VARIATION_ANNUAL_ITEM);
        setPlanOffer(process.env.NEXT_PUBLIC_ANNUAL_PRICE as string);
        setVariationPlanId(process.env.NEXT_PUBLIC_VARIATION_ANNUAL_ITEM as string);
    }} className='bg-purple p-[0.375rem] rounded-lg text-white'>Purchase</button>
</div>
        </div>

    </div>}
  
    </PaymentForm>
  )
}

export default OfferPlans