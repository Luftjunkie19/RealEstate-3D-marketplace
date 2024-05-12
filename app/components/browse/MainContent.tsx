'use client';

import { supabase } from '@/utils/supabase/client';
import React, { useCallback, useEffect, useState } from 'react'
import Offer from '../profile/items/Offer';

type Props={
  filters?:any[]

}

function MainContent({filters}:Props) {
    const [listings, setListings]=useState<any>([]);
    const getData = useCallback(async ()=>{
     const {data}= await supabase.from('listings').select('*');
     setListings(data);
      }, []);

    
    
    
  useEffect(()=>{
    getData();
    }, [getData]);

    const filteredData = () => {
      let uniqueSet = new Set();
      
      if (filters && filters.length > 0) {
        filters.map((filterOption) => {
          const filteredData = filterOption.filter(listings);
          console.log(filteredData);
          filteredData.map((item) => {
            uniqueSet.add(item); // Add each filtered item to the set
          });
        });
    
        return [...uniqueSet]; // Convert Set back to array
      } else {
        return listings;
      }
    };

  return (
    <div className="p-4 flex gap-2 flex-col items-center max-h-[66vh] h-full overflow-y-scroll">
            {filteredData().length > 0 && filteredData().map((offer:any, i:any)=>(<Offer key={i} photoURL={offer.images[0]} listedBy={offer.listed_by} offerTitle={offer.property_name} bathRooms={offer.bathrooms} bedRooms={offer.bedrooms} isForRent={offer.rent_offer} price={offer.price} id={offer.id} squareMetrage={offer.square_footage} />))}
          </div>
  )
}

export default MainContent