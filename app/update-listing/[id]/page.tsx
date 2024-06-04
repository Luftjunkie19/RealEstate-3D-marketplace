'use client';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa6';

type Props = {params:{id:string}}

function UpdateListing({params}: Props) {
  const router=useRouter();
const {id}=params;

const [property, setProperty]=useState(null);

const loadListingObject= async ()=>{
  const {data}= await supabase.from('listings').select('*').eq('id', id);
  if(data!.length > 0){
    setProperty(data![0]);
  }
}

useEffect(()=>{
  loadListingObject();
},[]);


const formSubmission= async (formData:FormData)=>{
  const propertyName = formData.get('property-name');
  const propertyPrice = formData.get('property-price');
  const squareFootage = formData.get('sqr-footage');
  const propertyDescription = formData.get('description');
  const bathroomsQty = formData.get('bathrooms');
  const bedroomsQty = formData.get('bedrooms');
  const providedAddress = formData.get('property-address');
  const isForRent = formData.get('isForRent');

  const fetchData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${providedAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
  const fetchResult = await fetchData.json();
  
  const address = fetchResult.results[0].formatted_address;
  const geometricPositions = fetchResult.results[0].geometry.location;


  const {error} = await supabase.from('listings').update({rent_offer:isForRent, price:propertyPrice, square_footage:squareFootage, geometric_positions:geometricPositions, description: propertyDescription, property_name:propertyName, bathrooms:bathroomsQty, bedrooms:bedroomsQty, address}).eq('id', id);
console.log(error);
  router.push('/');

}
  return (
    <div className='min-h-screen w-screen'>
   <form action={formSubmission} className="mx-auto p-6 my-8 max-w-6xl bg-darkGray rounded-lg flex flex-col gap-3">
              <p className="text-2xl text-white font-bold">Update your Real Estate</p>
{property && 
                  <><div className="grid w-full sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="flex col-span-1 flex-col gap-2">
              <p className="text-white font-semibold">Propety Name</p>
              <input onChange={(e) => setProperty({ ...property as any, property_name: e.target.value })} value={(property as any).property_name} name="property-name" className="p-2 outline-none rounded-lg" />
            </div>

            <div className="flex col-span-1 flex-col gap-2">
              <p className="text-white font-semibold">Price</p>
              <input onChange={(e) => setProperty({ ...property as any, price: +e.target.value })} value={(property as any).price} name="property-price" type='number' className="p-2 outline-none rounded-lg" />
            </div>

            <div className="flex flex-col gap-2 col-span-1 cursor-default">
              <p className="text-white font-semibold">Address, City</p>
              <input onChange={(e) => setProperty({ ...property as any, address: e.target.value })} value={(property as any).address} name="property-address" className="p-2 outline-none rounded-lg" />
            </div>

            <div className="flex flex-col gap-2 col-span-1">
              <p className="text-white font-semibold">Square footage m^2</p>
              <input onChange={(e) => setProperty({ ...property as any, square_footage: +e.target.value })} value={(property as any).square_footage} name="sqr-footage" type='number' className="p-2 outline-none rounded-lg" />
            </div>

            <div className="flex col-span-1 flex-col gap-2">
              <p className="text-white font-semibold">Bedrooms</p>
              <input onChange={(e) => setProperty({ ...property as any, bedrooms: +e.target.value })} value={(property as any).bedrooms} name="bedrooms" type='number' className="p-2 outline-none rounded-lg" />
            </div>

            <div className="flex flex-col gap-2 col-span-1">
              <p className="text-white font-semibold">Bathrooms</p>
              <input onChange={(e) => setProperty({ ...property as any, bathrooms: +e.target.value })} value={(property as any).bathrooms} name="bathrooms" type='number' className="p-2 outline-none rounded-lg" />
            </div>

          </div><div className="flex flex-col gap-2">
              <p className='text-white font-bold text-xl'>Is for rent?</p>
              <input onChange={(e) => setProperty({ ...property as any, rent_offer: e.target.value })} checked={(property as any).rent_offer} value={(property as any).rent_offer} name='isForRent' type="checkbox" className="toggle toggle-lg checked:text-purple checked:bg-purple" />
            </div><div className="flex gap-4 flex-col max-w-2xl w-full">
              <p className="text-xl text-white font-semibold">Description</p>
              <textarea onChange={(e) => setProperty({ ...property as any, description: e.target.value })} value={(property as any).description} className="border-2 outline-none text-white h-36 border-purple p-1 rounded-lg resize-none" name="description"></textarea>
            </div></>
}
  
<button type="submit" className='self-end max-w-60 w-full text-white text-lg font-semibold bg-purple p-2 rounded-xl'>Update property</button>
          </form>

    </div>
  )
}

export default UpdateListing;