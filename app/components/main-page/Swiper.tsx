'use client';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';

import React from 'react';

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

type Props = {}

function SwipeSlider({ }: Props) {
  const numberOfSlides = document.body.offsetWidth < 768 ? 1 : document.body.offsetWidth >= 768 && document.body.offsetWidth <= 1152 ? 2 : 3;
  return (
    <div className="flex flex-col gap-4 py-4">
   <p className="text-4xl pl-6 font-bold text-white">Featured Properties</p>
   <p className="text-lg pl-6 font-medium text-white">Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click View Details for more information.</p> 
    <div  className="w-screen mx-auto m-0">
        <Swiper  className="mySwiper w-screen"    spaceBetween={24}  slidesPerView={numberOfSlides} modules={[Navigation, Pagination]}>
          <SwiperSlide>
            <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={true} price={3000} />
          </SwiperSlide>
          <SwiperSlide>
             <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={false} price={550000} />
          </SwiperSlide>
          <SwiperSlide>
              <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={true} price={3000} />
          </SwiperSlide>
          <SwiperSlide>
    <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={false} price={550000} />
          </SwiperSlide>
</Swiper>

             
 </div>

    </div>
)}

export default SwipeSlider