'use client';
import RecentListingsBarChart from '@/app/components/profile/dashboard/BarChart'
import TypePieChart from '@/app/components/profile/dashboard/PieChart'
import PromotedList from '@/app/components/profile/dashboard/promotedListings/PromotedList';
import SucceededList from '@/app/components/profile/dashboard/successProperties/SucceededList';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { cancelSubscription, getOrder, getSubscriptionDetails, pauseSubscription, resumeSubscription, swapSubscription } from '@/utils/square/server';
import { supabase } from '@/utils/supabase/client';
import React, { use, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaPauseCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import {GrResume }from 'react-icons/gr';
import { IoIosSwap } from 'react-icons/io';
import ModalDialog from '@/app/components/profile/ModalDialog';
import { DialogClose } from '@/components/ui/dialog';

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
 const res= await cancelSubscription(userData.subscribtion_details.id, user?.id as string);
 if(res.errors ){
  toast.error(`${res.errors.map(item=> item.detail).join(' ')}`, {
    position:'bottom-right',
  });
  return;
}

 toast.success(`Subscription's Cancellation successfully done !`, {
  position:'bottom-right',
})
}

const pauseSub=async ()=>{
 
    const res= await pauseSubscription(userData.subscribtion_details.id);

    if(res.errors){
      toast.error(`${res.errors.map(item=> item.detail).join(' ')}`, {
        position:'bottom-right',
      });
      return;
    }

    toast.success('Successfully paused subscription. See ya !');
    console.log(res);
    await supabase.from('users').update({subscription_paused:res.subscription});
    setSubscriptionDetails({...subscriptionDetails, status:'PAUSED' });
  
};

const resumeSub= async ()=>{

    const res= await resumeSubscription(userData.subscribtion_details.id);
    if(res.errors){
      toast.error(`${res.errors.map(item=> item.detail).join(' ')}`, {
        position:'bottom-right',
      });
      return;
    }
    toast.success('Successfully resumed subscription. Welcome Back !');
    console.log(res);
    await supabase.from('users').update({subscription_paused:null});
    setSubscriptionDetails({...subscriptionDetails, status:'ACTIVE' });
  

}

const swapSub= async (swapPlanId:string)=>{

  const swapedSubscription= await swapSubscription(userData.subscribtion_details.id, swapPlanId);

  if(swapedSubscription.errors){
    toast.error(`${swapedSubscription.errors.map(item=> item.detail).join(' ')}`, {
      position:'bottom-right',
    });
    return;
  }

  console.log(swapedSubscription);

  toast.success('Subscription Plan Changed !', {
    position:'bottom-right',
  });
}


  return (
    <div className='w-full min-h-screen'>
      {userData && userData.is_subscribed && 
  <div className='p-2 flex flex-col gap-2'>
  <p className='text-3xl font-bold text-white'>Subscription Management</p>   
<div className="flex sm:flex-col lg:flex-row gap-2 justify-around items-center">
    {subscriptionDetails && !userData.subscription_paused ?
    <div>
      <p className='text-white font-bold text-lg'>{subscriptionDetails.lineItems[0].name}</p>
      <p className='text-green-400 font-semibold'>{(parseInt(subscriptionDetails.lineItems[0].basePriceMoney.amount)/100).toFixed(2)} {subscriptionDetails.lineItems[0].basePriceMoney.currency}</p>
      <p className='text-white'>Status: {subscriptionDetails.status}</p>
      <p className='text-white'>Started at: {new Date(subscriptionDetails.startDate).toDateString()}</p>
     </div>: <div>
      <p>{JSON.stringify(userData.subscription_paused)}</p>
     </div>
    }

    <div className="flex flex-col gap-2 text-white">
      <p className='text-xl font-semibold'>Subscription Management</p>
      <p className='max-w-md w-full'>Down below are located buttons you can manage your subscription with. In case any of buttons will not work, contact with support immediately.</p>
    {userData && userData.is_subscribed && <div className='flex gap-2 max-w-xs w-full overflow-x-auto items-center '>
      <button onClick={unsubscribe} className='bg-red-500 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Cancel <MdCancel/> </button>
      {subscriptionDetails && !userData.subscription_paused ? <button onClick={pauseSub} className='bg-yellow-500 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Pause <FaPauseCircle/></button> : 
      <button onClick={resumeSub} className='bg-green-400 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Resume <GrResume/></button>}  
      <ModalDialog buttonTitle={<button className='bg-blue-400 max-w-48 flex w-full items-center gap-1 p-2 rounded-xl text-white justify-center'>Swap <IoIosSwap/></button>} dialogTitle={'Select Your Swap-Plan !'} dialogDescription={''} dialogContent={<>
        <p className='text-white font-semibold'>Select a plan, you want to swap your plan with !</p>
        <div className="flex items-center justify-center text-white gap-8">
          <div className="flex flex-col items-center gap-2">
          <p>Daily Plan</p>
          <p className='text-green-400 font-semibold'>{9.99} $ / Day</p>
          <DialogClose onClick={()=>swapSub(process.env.NEXT_PUBLIC_VARIATION_WEEK_ITEM as string)} className="bg-blue-400 p-2 rounded-lg w-28 ">Swap</DialogClose>
          </div>
          <div className="flex flex-col gap-2 items-center">
          <p>Annual Plan</p>
          <p className='text-green-400 font-semibold'>{249.99} $ / Year</p>
          <DialogClose onClick={()=>swapSub(process.env.NEXT_PUBLIC_VARIATION_ANNUAL_ITEM as string)} className="bg-blue-400 p-2 rounded-lg w-28 ">Swap</DialogClose>
          </div>
        </div>
      </>} footerContent={<DialogClose className='flex gap-2 items-center bg-red-500 text-white p-2 rounded-xl'>Close <MdCancel/></DialogClose>}/>
      </div>
      }
    </div>
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