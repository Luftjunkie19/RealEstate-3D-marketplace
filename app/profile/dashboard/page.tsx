'use client';
import RecentListingsBarChart from '@/app/components/profile/dashboard/BarChart'
import TypePieChart from '@/app/components/profile/dashboard/PieChart'
import PromotedList from '@/app/components/profile/dashboard/promotedListings/PromotedList';
import SucceededList from '@/app/components/profile/dashboard/successProperties/SucceededList';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { cancelSubscription, getOrder, getSubscriptionDetails } from '@/utils/square/server';
import { supabase } from '@/utils/supabase/client';
import React, { use, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaPauseCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import {GrResume }from 'react-icons/gr';
import { IoIosSwap } from 'react-icons/io';

type Props = {}

function DashboardPage({}: Props) {
  const {user}=useAuthContext();
const [lisitings, setListings]=useState<any[]>([]);
const [userData, setUserData]=useState<any>(null);
const [subscriptionDetails, setSubscriptionDetails]=useState<any>(null);

const usersData=useCallback(async ()=>{
  if(user){
    const {data}= await supabase.from('users').select('*').eq('user_id', user.id).limit(1);
    const {data:listingsData}= await supabase.from('listings').select('*').filter('listed_by', 'eq', user.id);
    
    if(data && data.length > 0){
      setUserData(data[0]);
    }

    if(listingsData && listingsData.length > 0){
      setListings(listingsData);
    }

  }

},[user]);

const loadSubscriptionDetails=useCallback(async()=>{
  console.log(userData);
  if(userData && userData.subscribtion_details ){
    const subscriptionObject= await getSubscriptionDetails(userData.subscribtion_details.id);
    const orderObject= await getOrder(userData.subscribtion_details.phases[0].orderTemplateId);

    setSubscriptionDetails({...subscriptionObject.subscription, ...orderObject.order});
  }
},[userData])

useEffect(()=>{
  usersData();
},[usersData]);

useEffect(()=>{
  loadSubscriptionDetails();
},[loadSubscriptionDetails]);

const unsubscribe=async ()=>{
  await cancelSubscription(userData.subscribtion_details.id, userData.user_id);
toast.success(`Subscription's Cancellation successfully done !`, {
  position:'bottom-right',
})
}


  return (
    <div className='w-full min-h-screen'>
      {userData && userData.is_subscribed && 
  <div className='p-2 flex flex-col gap-2'>
  <p className='text-3xl font-bold text-white'>Subscription Management</p>   
<div className="flex gap-2 justify-around items-center">
    {subscriptionDetails && 
    <div>
      <p className='text-white font-bold text-lg'>{subscriptionDetails.lineItems[0].name}</p>
      <p className='text-green-400 font-semibold'>{(parseInt(subscriptionDetails.lineItems[0].basePriceMoney.amount)/100).toFixed(2)} {subscriptionDetails.lineItems[0].basePriceMoney.currency}</p>
      <p className='text-white'>Status: {subscriptionDetails.status}</p>
      <p className='text-white'>Started at: {new Date(subscriptionDetails.startDate).toDateString()}</p>
     </div>
     
    }
    {userData && userData.is_subscribed && <div className='flex gap-2 max-w-xs w-full overflow-x-auto items-center self-end'>
      <button onClick={unsubscribe} className='bg-red-500 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Cancel <MdCancel/> </button>
      <button className='bg-yellow-500 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Pause <FaPauseCircle/></button>
      <button className='bg-green-400 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Resume <GrResume/></button>
      <button className='bg-blue-400 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Swap <IoIosSwap/></button>
      </div>
      }
    </div>

</div>
      }
      {lisitings && lisitings.length > 0  && 
        <div className="flex sm:flex-col p-2 lg:flex-row max-w-7xl mx-auto m-0 items-center gap-4 w-full">      
        <div className="flex flex-col gap-1 max-w-sm w-full">
          <p className="text-white font-bold text-2xl">Your Promoted Listings</p>
        <PromotedList listings={lisitings}/>
        </div>
      </div>
      }

     <div className="p-2">
      <p className='text-white text-3xl font-semibold'>Your Statistics</p>
      {
        userData &&
      <div className="flex sm:flex-col p-2 lg:flex-row max-w-7xl mx-auto m-0 items-center gap-4 w-full">
        {userData && <RecentListingsBarChart listings={[
    {
        label: '5 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType === 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 5 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 4
        ).length
    },
    {
        label: '4 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType === 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 4 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 3
        ).length
    },
    {
        label: '3 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType === 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 3 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 2
        ).length
    },
    {
        label: '2 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType === 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 2 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 1
        ).length
    },
    {
        label: '1 day', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType === 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 1 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 0
        ).length
    }
]}/>}
        <TypePieChart listings={[{propertyType:'Sale', propertiesAmount:userData.successfull_transactions.filter((listing)=>listing.listingOfferType !== 'rent').length}, {propertyType:'Rent', propertiesAmount:userData.successfull_transactions.filter((listing)=>listing.listingOfferType === 'rent').length}]}/>
        {userData && <RecentListingsBarChart  listings={[
    {
        label: '5 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType !== 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 5 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 4
        ).length
    },
    {
        label: '4 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType !== 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 4 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 3
        ).length
    },
    {
        label: '3 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType !== 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 3 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 2
        ).length
    },
    {
        label: '2 days', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType !== 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 2 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 1
        ).length
    },
    {
        label: '1 day', 
        propertiesAmount: userData.successfull_transactions.filter(
            (listing) => listing.listingOfferType !== 'rent' &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) <= 1 &&
            (new Date().getTime() - new Date(listing.createdAt).getTime()) / (1000 * 3600 * 24) > 0
        ).length
    }
]}/>}
      </div>
      }
     </div>
     
     {userData && userData.successfull_transactions.length > 0 &&
     <div className="p-2 flex flex-col gap-2">
      <p className='text-white text-xl font-bold'>Successfully Rented/Sold Properties:</p>
      <SucceededList listings={userData.successfull_transactions} />
     </div>
     }
    </div>
  )
}

export default DashboardPage