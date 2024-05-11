'use client';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import {formatDistance, formatDistanceToNow} from 'date-fns'
import { IconType } from 'react-icons/lib';
type Props = {}
import { BsFillHousesFill } from "react-icons/bs";
import { FaMessage, FaPencil, FaStar } from 'react-icons/fa6';
import { supabase } from '@/utils/supabase/client';
import Offer from '../components/profile/items/Offer';
import { useRouter } from 'next/navigation';

function CurrentUserPage({}: Props) {
  const [object, setObject]=useState<any[]>([]);
  const [favourites, setFavourites]=useState<any[]>([]);
  const router= useRouter();
  const {user}=useAuthContext();
  interface tabObject{
    id:number,
    content:string,
    tabIcon:IconType
  }
  const [activeTab, setActiveTab]=useState<number>(0);
const tabs:tabObject[]=[{id:1, content:'Properties', tabIcon:BsFillHousesFill}, {id:2, content:'Messages', tabIcon:FaMessage}, {id:3, content:'Favourited', tabIcon:FaStar}]
// eslint-disable-next-line react-hooks/exhaustive-deps
const getDataNeeded=async ()=>{
  if(user){
    const {data:yourListings, error:yourListingsError} = await supabase.from('listings').select('*').eq('listed_by', user.id);

    if(!yourListingsError){
      setObject(yourListings);
    }
  

    const {data, error}= await supabase.from('users').select('favourite_properties').eq('id', user.id);

    if(data && !error){
      setFavourites(data);
    }
  }


}
useEffect(()=>{
  getDataNeeded();

}, [getDataNeeded])

    return (
    <div className='w-screen min-h-screen'>
    {user && user.user_metadata && 
<>
    <div className='flex m-0 mx-auto justify-around flex-wrap max-w-6xl p-6 gap-6 items-center'>
        <Image src={user.user_metadata.picture} width={256} height={256} alt='' className='w-64 h-64 object-cover rounded-full'/>
    <div className="flex flex-col gap-4">       
    <p className='text-4xl font-bold text-white'>{user.user_metadata.full_name}</p>
    <p className='text-white text-sm'>{user.user_metadata.email}</p>
    <p className=' text-green-400 font-semibold'>Last time signed in: {formatDistanceToNow(user.last_sign_in_at as string)}</p>
    <button onClick={()=>router.push('/update-profile')} className='bg-purple p-2 rounded-xl text-white flex gap-2 items-center justify-center max-w-sm'>Edit profile <FaPencil/> </button>
    </div>
    </div>

    <div role="tablist" className="tabs tabs-bordered border-purple max-w-xl mx-auto m-0">
        {tabs.map((tabItem)=>(<a onClick={()=>setActiveTab(tabItem.id)} key={tabItem.id} role='tab' className={`tab ${activeTab === tabItem.id && 'tab-active text-purple'} font-bold flex items-center gap-2`}>
            <p className='sm:hidden lg:block'>{tabItem.content}</p>
            <tabItem.tabIcon className={`${activeTab === tabItem.id ? 'text-purple' : 'text-white'}`}/>
            </a>))}
</div>

{activeTab === 1 && object.length > 0 && <div className='flex flex-col mx-auto m-0 items-center my-2 gap-2 max-h-96 overflow-y-scroll'>
  {object.map((item:any)=>(<Offer listedBy={item.listed_by} key={item.id} photoURL={item.images[0]} offerTitle={item.property_name} bathRooms={item.bathrooms} bedRooms={item.bedrooms} isForRent={item.rent_offer} price={item.price} squareMetrage={item.square_footage} id={item.id}/>))}
  </div>}
<div className="flex flex-wrap gap-4 mx-auto m-0 p-4">
{activeTab === 3 &&   <><p className='text-white text-center'>{favourites.length} properties appeal to you.</p></>}
</div>
</>
    
    }
    </div>
  )
}

export default CurrentUserPage