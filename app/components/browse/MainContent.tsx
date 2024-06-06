'use client';

import { supabase } from '@/utils/supabase/client';
import React, { useCallback, useEffect, useState } from 'react'
import Offer from '../profile/Offer';
import { getCurrentData } from '@/utils/supabase/getCurrentObjects';

type Props={
  filters?:any[]

}

function MainContent({filters}:Props) {
    const [listings, setListings]=useState<any>([]);

      const filtered = useCallback(async () => {
        const {data}= await supabase.from('listings').select('*');
        setListings(data);
      
        getCurrentData('listings', setListings, data as any[]);

        let uniqueSet = new Set();
        
        if (filters && filters.length > 0) {
          filters.map((filterOption) => {
            const filteredData = filterOption.filter(listings);
            console.log(filteredData);
            filteredData.map((item) => {
              uniqueSet.add(item); 
            });
          });

          getCurrentData('listings', setListings,  [...uniqueSet]);
         
        }
      },[filters, listings]);
    
    
  useEffect(()=>{
    filtered();
    }, [filtered]);


  return (
    <div className="p-4 flex gap-2 flex-col items-center max-h-[66vh] h-full overflow-y-scroll">
            {listings.length > 0 && listings.map((offer:any, i:any)=>(<Offer isPromoted={offer.promotion_details && offer.promotion_details.promotionEnd && new Date(offer.promotion_details.promotionEnd).getTime() >= new Date().getTime()} key={i} photoURL={offer.images[0]} listedBy={offer.listed_by} offerTitle={offer.property_name} bathRooms={offer.bathrooms} bedRooms={offer.bedrooms} isForRent={offer.rent_offer} price={offer.price} id={offer.id} squareMetrage={offer.square_footage} />))}
          </div>
  )
}

export default MainContent