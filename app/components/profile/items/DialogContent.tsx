/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from '@/utils/supabase/client';
import { PostgrestResponse } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

type Props = {propertyId:string, collectionsName:'listings' | 'users'}

function DialogContent({propertyId, collectionsName}: Props) {

    const [property,setProperty]=useState<any | null>(null);

  

    useEffect(()=>{
        const loadProperty= async ()=>{
            const loadedObject=  await supabase.from(collectionsName).select('*').eq('id', propertyId).limit(1);
        if(loadedObject.data){
            setProperty(loadedObject.data[0]);
        }
            }

        loadProperty();
    },[]);

    const formSubmission= async (formData:FormData)=>{
        const propertyName= formData.get('property-name');
        const address= formData.get('address');
        const price= formData.get('price');
        const squareMetrage= formData.get('square-metrage')


    }

  return (
    
    
    <form action={formSubmission} className='grid  sm:grid-cols-1 md:grid-cols-2 gap-2'>
    {property && <>    
    <div className="flex flex-col gap-1">
    <p>Property Name</p>
    <input name='property-name' value={property.property_name} type="text"  className=' p-1 rounded-lg max-w-sm text-white' />
  </div>
  <div className="flex flex-col gap-1">
    <p>Address</p>
    <input name='address' value={property.address} type="text" className=' p-1 rounded-lg max-w-sm text-white' />
  </div>
  <div className="flex flex-col gap-1">
    <p>Price</p>
    <input name='price' value={property.price} type="number" className=' p-1 rounded-lg max-w-sm text-white' />
  </div>
  <div className="flex flex-col gap-1">
    <p>Square Metrage</p>
    <input value={property.square_footage} name='square-metrage' type="number" className=' p-1 rounded-lg max-w-sm text-white' />
  </div>
  <div className="flex flex-col gap-1">
    <p>Bedrooms</p>
    <input value={property.bedrooms} name='bedrooms' type="number" className=' p-1 rounded-lg max-w-sm text-white' />
  </div>
  <div className="flex flex-col gap-1">
    <p>Bathrooms</p>
    <input value={property.bathrooms} name='bathrooms' type="number" className='p-1 rounded-lg text-white max-w-sm' />
  </div>
    </>}
  <button className=' bg-purple p-2 my-1 rounded-lg col-span-2 max-w-52 w-full place-self-end text-white'>Submit</button>
  </form>
    
    
    
  )
}

export default DialogContent