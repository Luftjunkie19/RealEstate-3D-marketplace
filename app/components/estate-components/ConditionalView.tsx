'use client';
 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React, { useState } from 'react'
import EstateCanvas from '../estate/EstateCanvas'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
 
 type Props = { data:any}
 
 function ConditionalView({ data}: Props) {

    const [selectedOption, setSelectedOption]=useState(1);
    
   return (
     <>
     { selectedOption === 1 &&  <div className="mx-auto m-0 flex justify-center">
      <Carousel className='max-w-4xl'>
  <CarouselContent className='w-full h-80'>
   {data && data[0].images && data[0].images.map((item:any)=>(
   <CarouselItem key={item} className='w-full h-80'>
    <Image width={256} height={256} alt='' className='w-full h-80 object-cover'  src={item}/>
    </CarouselItem>))}
  </CarouselContent>
  <CarouselPrevious className='sm:hidden xl:block' />
  <CarouselNext className='sm:hidden xl:block'/>
</Carousel>
      </div>}

      {selectedOption === 2 && data[0].presentation_object && <div className=' max-w-7xl w-full mx-auto m-0 h-96'>
  <EstateCanvas object3D={data[0].presentation_object}/>
  </div>}
     <div className="flex justify-center items-center m-6">
  <Tabs defaultValue="account">
  <TabsList className="w-fit p-4 rounded-full bg-darkGray border-purple border">
    <TabsTrigger className={` rounded-full ${selectedOption === 1  ? 'bg-purple text-darkGray' : 'bg-darkGray text-purple'}`} onClick={()=>setSelectedOption(1)} value="account">Images</TabsTrigger>
    {data[0].presentation_object &&
    <TabsTrigger className={` rounded-full ${selectedOption === 2 ? 'bg-purple text-darkGray' : 'bg-darkGray text-purple'}`}  onClick={()=>setSelectedOption(2)} value="password">3D Presentation</TabsTrigger>
    }
  </TabsList>
</Tabs>
     </div>

     
     </>
   )
 }
 
 export default ConditionalView