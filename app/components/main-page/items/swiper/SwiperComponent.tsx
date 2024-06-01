// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';
import propertyImage from '@/assets/images.jpeg'
import React, { useCallback, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Offer from '../Offer'
import { Navigation, Pagination } from 'swiper/modules';
import { getCurrentData } from '@/utils/supabase/getCurrentObjects';

type Props = {data:any[], numberOfSlides:number, setCurrentListings:(data:any)=>void}

function SwiperComponent({numberOfSlides, data, setCurrentListings}: Props) {
const getData=useCallback(()=>{
    getCurrentData('listings',setCurrentListings, data);
},[data, setCurrentListings]);

useEffect(()=>{
    getData();
},[getData]);



  return (
    <Swiper className="mySwiper w-screen" spaceBetween={24}  slidesPerView={numberOfSlides} modules={[Navigation, Pagination]}>
    {data.map((item:any)=>(
        <SwiperSlide key={item.id}>
        <Offer id={item.id} squareMetrage={item.square_footage} imageUrl={item.images[0] ? item.images[0] : propertyImage} name={item.property_name} description={item.description} barthRooms={item.bathrooms} bedRooms={item.bedrooms} isForRent={item.rent_offer} price={item.price} />
      </SwiperSlide>
    ))}
    
  
</Swiper>
  )
}

export default SwiperComponent