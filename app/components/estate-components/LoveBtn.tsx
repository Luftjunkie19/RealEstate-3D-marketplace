'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';

import React, { useCallback, useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

type Props = {propertyId:string}

function LoveBtn({propertyId}:Props) {
    const {user:userData}=useAuthContext();
    const [isLoved, setIsLoved]=useState(false);

    const manageFavourite= async ()=>{
        const {data}= await supabase.from('users').select('*').eq('email', userData!.email).limit(1);
    
        if(data && data[0].favourite_properties){
          if(!data[0].favourite_properties.find((item:string)=> item === propertyId)){
            await supabase.from('users').update({favourite_properties: [...data[0].favourite_properties, propertyId]}).eq('email', userData!.email);
          }
          
          else{
            await supabase.from('users').update({favourite_properties: data[0].favourite_properties.filter((property:string)=>property !== propertyId)}).eq('email', userData!.email);
          }
        }
        
        else{
            await supabase.from('users').update({favourite_properties: [propertyId]}).eq('email', userData!.email);
        }
      }


      
      const lovedOrNot= useCallback(async ()=>{
        const isLoved= await supabase.from('users').select('favourite_properties').limit(1);
        if(isLoved.data && isLoved.data[0].favourite_properties){
          if(isLoved.data[0].favourite_properties.find((propId:string)=>propId === propertyId)){
            setIsLoved(true)
          }else{
            setIsLoved(false);
          }
        }
      }, [propertyId]);
  
      useEffect(()=>{
        lovedOrNot();
      }, [lovedOrNot])

  return (
    <button onClick={manageFavourite} className='text-xl'><FaHeart className={`${isLoved ? 'text-red-500' : 'text-white'}`}/></button>
  )
}

export default LoveBtn