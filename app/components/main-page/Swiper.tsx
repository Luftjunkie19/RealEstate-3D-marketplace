

'use client';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';

import React, { useEffect, useState } from 'react';

import {
  Navigation,
  Pagination,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import image from '@/assets/images.jpeg';

import Offer from './items/Offer';
import { supabase } from '@/utils/supabase/client';
import { setDate } from 'date-fns';
import { useWindowSize } from '@/utils/hooks/useWindowsSizes';

type Props = {}




 function SwipeSlider({ }: Props) {
  const windowsSizes=useWindowSize();

  const numberOfSlides = (windowsSizes as any)?.width < 768 ? 1 : (windowsSizes as any)?.width > 768 && (windowsSizes as any)?.width <= 1152 ? 2 : 3;
  const [listings, setListings]=useState<any>([]);
  const getData = async ()=>{
   const {data}= await supabase.from('listings').select('*');
   setListings(data);
    };
  
  
useEffect(()=>{
  getData();
  }, []);




  
  return (
    <div className="flex flex-col gap-4 py-4">

   <p className="text-4xl pl-6 font-bold text-white">Featured Properties</p>
   <p className="text-lg pl-6 font-medium text-white">Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through VirtuEstate. Click View Details for more information.</p> 
    <div  className="w-screen mx-auto m-0">
        <Swiper  className="mySwiper w-screen"    spaceBetween={24}  slidesPerView={numberOfSlides} modules={[Navigation, Pagination]}>
         {listings.map((item:any)=>(
             <SwiperSlide key={item.id}>
             <Offer id={item.id} squareMetrage={item.square_footage} imageUrl={`${item.images[0]}`} name={item.property_name} description={item.description} barthRooms={item.bathrooms} bedRooms={item.bedrooms} isForRent={item.rent_offer} price={item.price} />
           </SwiperSlide>
         ))}
         
       
</Swiper>

             
 </div>

    </div>
)}

export default SwipeSlider