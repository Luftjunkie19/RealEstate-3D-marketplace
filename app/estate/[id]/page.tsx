

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import { MdSell } from "react-icons/md";
import React from 'react'
import { FaBath, FaBed, FaCube } from 'react-icons/fa6';
import { FaLocationDot } from "react-icons/fa6";
type Props = {
    params:{id:string}
}

import { GiHouseKeys } from "react-icons/gi";
import PointWithMap from '@/app/components/PointWithMap';

async function DetailedPage({params}: Props) {

    const {id}=params;

    const {data}= await supabase.from('listings').select('*').eq('id', id).limit(1);


  return (
    <div className='min-h-screen w-screen'>
      <div className="mx-auto m-0 flex justify-center">
      <Carousel className='max-w-4xl'>
  <CarouselContent className='w-full h-80'>
   {data && data[0].images && data[0].images.map((item:any)=>(
   <CarouselItem key={item} className='w-full h-80'>
    <Image width={256} height={256} alt='' className='w-full h-80 object-cover'  src={item}/>
    </CarouselItem>))}
  </CarouselContent>
  <CarouselPrevious className='sm:hidden lg:block' />
  <CarouselNext className='sm:hidden lg:block'/>
</Carousel>
      </div>
        {data && data[0] && <>
          <div className="flex gap-6 items-center p-2 justify-between max-w-md">
            <p className='text-xl font-medium text-white'>{data[0].property_name}</p>

            <p className='text-3xl font-bold text-white'>{data[0].price} $</p>
          </div>

<div className="flex items-center gap-2 flex-wrap">

<p className="py-2 px-4 rounded-xl items-center flex gap-2 border border-darkGray text-white">
  <FaCube />
  <span>{data[0].square_footage} m^2</span>
</p>

<p className="py-2 px-4 rounded-xl items-center flex gap-5 border border-darkGray text-white">
  <FaBath />
  <span>{data[0].bathrooms}</span>
</p>

<p className="py-2 px-4 rounded-xl items-center flex gap-5 border border-darkGray text-white">
  <FaBed />
  <span>{data[0].bedrooms}</span>
</p>

{data[0].renf_offer ? <p className="py-2 px-4 rounded-xl items-center flex gap-6 border border-darkGray text-white">
  <GiHouseKeys/>
  <span>{data[0].bathrooms}</span>
</p> : <p className="py-2 px-4 rounded-xl items-center flex gap-6 border border-darkGray text-white">
  <MdSell />
  <span>Sale</span>
</p>}

</div>

<div className="flex flex-col gap-1">
  <p className=' text-lg text-white font-medium flex gap-1 items-center'><FaLocationDot/> Address</p>
  <p className='text-white font-bold'>{data[0].address}</p>
</div>

<div className="flex flex-col gap-1 my-2">
  <p className='text-white text-2xl font-semibold'>Description</p>

  <p>{data[0].description}</p>
</div>
         
   <PointWithMap lat={+data[0].geometric_positions.lat} lng={+data[0].geometric_positions.lng} address={data[0].address}/>

          </>}
    </div>
  )
}

export default DetailedPage