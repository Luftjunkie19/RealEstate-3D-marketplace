"use client";

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast';

import { FaCamera } from 'react-icons/fa6'

type Props = {}

function Page({}: Props) {
  const {user}=useAuthContext();
  
    const [images, setImages] = useState<string | any>([]);

    const formAction = async (formData:FormData) => {
try {
  const propertyName= formData.get('property-name');
  const propertyPrice = formData.get('property-price');
  const squareFootage= formData.get('sqr-footage');
  const propertyDescription= formData.get('description');
  const bathroomsQty= formData.get('bathrooms');
  const bedroomsQty= formData.get('bedrooms');
    const providedAddress= formData.get('property-address'); 
    const isForRent= formData.get('isForRent');
    const fetchData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${providedAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
    const fetchResult = await fetchData.json();

    console.log(fetchResult.results[0].formatted_address);
    console.log(fetchResult.results[0].geometry.location);

    let imgs: any[]= [];

    const fileReader= new FileReader();

    images.map((item:any)=>{
      fileReader.onload=()=>{
        imgs.push(item);
      }
    })

    

const item = await fetch('/api/insert', {method:"POST", body:JSON.stringify({object:{
  listed_by: user && user.id,
  address: fetchResult.results[0].formatted_address,
  rent_offer:isForRent,
  geometric_positions:fetchResult.results[0].geometry.location,
  bathrooms: Number(bathroomsQty),
  bedrooms: Number(bedroomsQty),
  square_footage: Number(squareFootage),
  description:propertyDescription,
  price: Number(propertyPrice),
  property_name:propertyName,
  images:imgs,
}, collection:'listings'}), headers:{
  'Content-Type':'application/json'
} });

const result = await item.json();

console.log(result);
    
    toast.success('Property Successfully added');
  
} catch (error) {
  console.log(error);
}

     
    
    }

const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) {
    toast.error('No image uploaded');
    return;
  }

  if (e.target.files.length > 6) {
    toast.error('Too many images uploaded. Maximum 6 images.');
    return;
  }


  console.log(Array.from(e.target.files));

  setImages(Array.from(e.target.files))
};






  return (
    <div className="min-h-screen w-screen">
        
          <form action={formAction} className="mx-auto p-6 my-8 max-w-6xl bg-darkGray rounded-lg flex flex-col gap-3">
              <p className="text-2xl text-white font-bold">List your Real Estate</p>



                  <div className="grid w-full sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Propety Name</p>
                        <input name="property-name"  className="p-2 outline-none rounded-lg"/>
                      </div>

                       <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Price</p>
                        <input name="property-price" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                        <div className="flex flex-col gap-2 col-span-1">
                        <p className="text-white font-semibold">Address, City</p>
                        <input name="property-address" className="p-2 outline-none rounded-lg"/>
                      </div>

                        <div className="flex flex-col gap-2 col-span-1">
                        <p className="text-white font-semibold">Square footage m^2</p>
                        <input name="sqr-footage" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                       <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Bedrooms</p>
                        <input name="bedrooms" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                       <div className="flex flex-col gap-2 col-span-1">
                        <p className="text-white font-semibold">Bathrooms</p>
                        <input name="bathrooms" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                  

                      
</div>
         
<div className="flex flex-col gap-2">
  <p className='text-white font-bold text-xl'>Is for rent?</p>
  <input name='isForRent' type="checkbox"  className="toggle toggle-lg checked:text-purple checked:bg-purple" />
</div>


<div className="flex flex-col gap-4">
                  <p className='font-bold text-white text-xl flex gap-2 items-center'><FaCamera size={24} className='text-purple'/> Images</p>
                  <input onChange={handleImages} name="images" type="file" multiple  className="file-input outline-none text-white  bg-purple w-full max-w-xs" accept="image/*" />
</div>
              

              <div className="flex gap-4 flex-col max-w-2xl w-full">
                  <p className="text-xl text-white font-semibold">Description</p>
                  <textarea className="border-2 outline-none text-white h-36 border-purple p-1 rounded-lg resize-none " name="description"></textarea>
              </div>

<button type="submit" className='self-end max-w-60 w-full text-white text-lg font-semibold bg-purple p-2 rounded-xl'>List your property</button>
          </form>
          
    </div>
  )
}

export default Page