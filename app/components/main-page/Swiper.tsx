'use client';
import image from '@/assets/images.jpeg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React from 'react';

import Offer from './items/Offer';

type Props = {}

function SwipeSlider({ }: Props) {
    
  return (
    <div className="flex flex-col gap-4 py-4">
   <p className="text-4xl pl-6 font-bold text-white">Featured Properties</p>
   <p className="text-lg pl-6 font-medium text-white">Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click View Details for more information.</p> 
    <div  className="gap-8 flex m-0 mx-auto ">

      <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={false} price={550000} />

 <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={true} price={3000} />
 
           <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={false} price={550000} />


           <Offer squareMetrage={50} imageUrl={image} name={'Real Estate'} description={'Beautiful estate near to the sea side resort, surrounded by forest.'} barthRooms={2} bedRooms={3} isForRent={true} price={3000} />


 </div>

    </div>
)}

export default SwipeSlider