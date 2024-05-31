

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import { MdSell } from "react-icons/md";
import React, { useState } from 'react'
import { FaBath, FaBed, FaCube, FaMessage } from 'react-icons/fa6';
import { FaLocationDot } from "react-icons/fa6";
type Props = {
    params:{id:string}
}

import { GiHouseKeys } from "react-icons/gi";
import PointWithMap from '@/app/components/PointWithMap';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import Link from 'next/link';
import ContactBtn from '@/app/components/estate-components/ContactBtn';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import LoveBtn from '@/app/components/estate-components/LoveBtn';
import EstateCanvas from '@/app/components/estate/EstateCanvas';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConditionalView from '@/app/components/estate-components/ConditionalView';

async function DetailedPage({params}: Props) {
    const {id}=params;
    const {data}= await supabase.from('listings').select('*').eq('id', id).limit(1);

    const {data:sellerData}= await supabase.from('users').select('*').eq('user_id', (data as any)[0].listed_by).limit(1);

  return (
    <div className='min-h-screen w-screen'>
      
        {data && data[0] && <>

<ConditionalView data={data}/>
     
        
 


      <div className="flex px-2 py-4 items-center gap-2 flex-wrap">

<p className="py-2 bg-darkGray px-4 rounded-xl items-center flex gap-2 border border-darkGray text-white">
  <FaCube />
  <span>{data[0].square_footage} m^2</span>
</p>

<p className="py-2 bg-darkGray px-4 rounded-xl items-center flex gap-5 border border-darkGray text-white">
  <FaBath />
  <span>{data[0].bathrooms}</span>
</p>

<p className="py-2 bg-darkGray px-4 rounded-xl items-center flex gap-5 border border-darkGray text-white">
  <FaBed />
  <span>{data[0].bedrooms}</span>
</p>

{data[0].renf_offer ? <p className="py-2 bg-darkGray px-4 rounded-xl items-center flex gap-6 border border-darkGray text-white">
  <GiHouseKeys/>
  <span>{data[0].bathrooms}</span>
</p> : <p className="py-2 bg-darkGray px-4 rounded-xl items-center flex gap-6 border border-darkGray text-white">
  <MdSell />
  <span>Sale</span>
</p>}

</div>

<div className="flex sm:flex-wrap lg:flex-nowrap gap-6 max-w-6xl w-full justify-between mx-auto m-0">
        <div className="bg-darkGray p-4  max-w-lg w-full rounded-lg">
        <div className="flex gap-6 items-center px-1 justify-between max-w-md">
            <p className='lg:text-xl font-medium text-white'>{data[0].property_name}</p>

            <p className='lg:text-3xl sm:text-xl text-nowrap font-bold text-white'>{data[0].price} $</p>
 </div>



<div className="flex flex-col gap-1">
  <p className=' text-lg text-white font-medium flex gap-1 items-center'><FaLocationDot/> Address</p>
  <p className='text-white font-bold'>{data[0].address}</p>
</div>

        </div>

        <div className="max-w-xs flex flex-col gap-6 w-full bg-darkGray p-4 rounded-lg">
          <div className="flex w-full justify-between items-center p-2">
            <p className='text-white font-semibold text-sm'>{format(data[0].listed_at, 'do MMMM yyyy')}</p>
          <LoveBtn propertyId={id}/>
          </div>

<div className="flex gap-4 px-2 cursor-pointer items-center w-full">
  {sellerData && sellerData.length > 0 && <Link className='flex gap-2 items-center' href={`/profile/${data[0].listed_by}`}>
<Image src={sellerData[0].profile_image} alt='' width={32} height={32} className='rounded-full w-8 h-8'/>
<p className='text-white text-sm'>{sellerData[0].user_name}</p>
  </Link>}
         <ContactBtn data={data} id={id}/>
</div>
        </div>
</div>
         

<div className="flex flex-col gap-1  m-2">
  <p className='text-white text-2xl font-semibold'>Description</p>

  <p className='text-white p-2 rounded-lg max-w-3xl bg-darkGray border-2 border-bgColor'>{data[0].description}</p>
</div>
         
   <PointWithMap lat={+data[0].geometric_positions.lat} lng={+data[0].geometric_positions.lng} address={data[0].address}/>

          </>}
    </div>
  )
}

export default DetailedPage