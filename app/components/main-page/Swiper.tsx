

'use client';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';

import propertyImage from '@/assets/images.jpeg'

import React, { useCallback, useEffect, useState } from 'react';

import {
  Navigation,
  Pagination,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import Offer from './items/Offer';
import { supabase } from '@/utils/supabase/client';
import { useWindowSize } from '@/utils/hooks/useWindowsSizes';
import SwiperComponent from './items/swiper/SwiperComponent';


type Props = {}




 function SwipeSlider({ }: Props) {
  const windowsSizes=useWindowSize();

  const numberOfSlides = (windowsSizes as any)?.width < 768 ? 1 : (windowsSizes as any)?.width > 768 && (windowsSizes as any)?.width <= 1152 ? 2 : 3;
  const [listings, setListings]=useState<any>([]);
  const getData = useCallback(async ()=>{
   const {data}= await supabase.from('listings').select('*');
 if(data){
   setListings(data);
 }

    }, []);
  
  
useEffect(()=>{
  getData();
  }, [getData]);




  
  return (
    <div className="flex flex-col gap-4 py-4">

   <p className="text-4xl pl-6 font-bold text-white">Featured Properties</p>
   <p className="text-lg pl-6 font-medium text-white">Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through VirtuEstate. Click View Details for more information.</p> 
    <div  className="w-screen mx-auto m-0">
       <SwiperComponent numberOfSlides={numberOfSlides} data={listings} setCurrentListings={setListings}/>

             
 </div>

    </div>
)}

export default SwipeSlider