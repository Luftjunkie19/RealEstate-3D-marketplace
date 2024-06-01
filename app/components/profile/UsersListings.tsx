'use client';
import React, { useCallback, useEffect, useState } from 'react'

import { getCurrentData } from '@/utils/supabase/getCurrentObjects';
import Offer from './Offer';

type Props = {usersListings:any, listerId:string}

function UsersListings({usersListings, listerId}: Props) {
const [listings, setListings]=useState<any[] | []>(usersListings);

const getData=useCallback(()=>{
    getCurrentData('listings',setListings, usersListings, `listed_by=eq.${listerId}`);
},[listerId, usersListings]);

useEffect(()=>{
    getData();
},[getData]);


  return (
    <div className={`flex flex-wrap ${listings && listings.length === 0 && 'justify-center items-center'} max-w-3xl gap-4 mx-auto m-0 p-4 w-full`}>
    {listings && listings.length === 0 && <p className='text-white text-xl font-bold'>No Properties Added Yet.</p>}
  { listings && listings.length > 0 && listings.map((item:any)=><><Offer photoURL={item.images[0]} offerTitle={item.property_name} bathRooms={item.bathrooms} bedRooms={item.bedrooms} isForRent={item.rent_offer} price={item.price} squareMetrage={item.square_footage} id={item.id} listedBy={listerId}/></>)}
  </div>
  )
}

export default UsersListings