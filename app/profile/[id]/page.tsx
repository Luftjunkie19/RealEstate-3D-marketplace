import Offer from '@/app/components/main-page/items/Offer';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { BsFillHousesFill } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

type Props = {
    params:{id:string}
}

async function ProfilePage({params}: Props) {

    const {id}=params;

  interface tabObject{
    id:number,
    content:string,
    tabIcon:IconType
  }
  const {data:user}= await supabase.from('users').select('*').eq('user_id', id).limit(1); 
const tabs:tabObject[]=[{id:1, content:'Properties', tabIcon:BsFillHousesFill}]
const {data}=await supabase.from('listings').select('*');

  return (
    <div className='w-screen min-h-screen'>
    {user && user[0] && 
<>
    <div className='flex m-0 mx-auto justify-around flex-wrap max-w-6xl p-6 gap-6 items-center'>
        <Image src={user[0].profile_image} width={256} height={256} alt='' className='w-64 h-64 object-cover rounded-full'/>
    <div className="flex flex-col gap-4">       
    <p className='text-4xl font-bold text-white'>{user[0].user_name}</p>
    <p className='text-white text-sm'>{user[0].email}</p>
    </div>
    </div>

    <div role="tablist" className="tabs tabs-bordered border-purple max-w-xl mx-auto m-0">
        {tabs.map((tabItem)=>(<a key={tabItem.id} role='tab' className={`tab tab-active text-purple font-bold flex items-center gap-2`}>
            {tabItem.content}
            <tabItem.tabIcon className={`text-purple`}/>
            </a>))}
</div>

<div className={`flex flex-wrap ${data && data.filter((item)=>item.listed_by===id).length === 0 && 'justify-center items-center'} gap-4 mx-auto m-0 p-4 max-w-screen-2xl`}>
  {data && data.filter((item)=>item.listed_by===id).length === 0 && <p className='text-white text-xl font-bold'>No Properties Added Yet.</p>}
{ data && data.filter((item)=>item.listed_by===id).length > 0 && data.filter((item)=>item.listed_by===id).map((item:any)=><><Offer imageUrl={item.images[0]} name={item.property_name} description={item.description} barthRooms={item.bathrooms} bedRooms={item.bedrooms} isForRent={item.rent_offer} price={item.price} squareMetrage={item.square_footage} id={item.id}/></>)}
</div>
</>
    
    }
    </div>
  )
}

export default ProfilePage