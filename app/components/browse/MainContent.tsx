'use client';

import { supabase } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react'
import Offer from '../profile/items/Offer';

function MainContent() {
    const [listings, setListings]=useState<any>([]);
    const getData = async ()=>{
     const {data}= await supabase.from('listings').select('*');
     setListings(data);
      };
    
    
  useEffect(()=>{
    getData();
    }, [getData]);

  return (
    <div className="p-4 flex gap-2 flex-col items-center">
            {listings && listings.map((offer:any, i:any)=>(<Offer key={i} photoURL={offer.images[0]} listedBy={offer.listed_by} offerTitle={offer.property_name} bathRooms={offer.bathrooms} bedRooms={offer.bedrooms} isForRent={offer.rent_offer} price={offer.price} id={offer.id} squareMetrage={offer.square_footage} />))}
          </div>
  )
}

export default MainContent