'use client';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import {formatDistance, formatDistanceToNow} from 'date-fns'
import { IconType } from 'react-icons/lib';
type Props = {}
import { BsFillHousesFill } from "react-icons/bs";
import { FaMessage, FaPencil, FaStar } from 'react-icons/fa6';
import { supabase } from '@/utils/supabase/client';
import Offer from '../components/profile/items/Offer';
import { useRouter } from 'next/navigation';
import { IoIosNotifications } from 'react-icons/io';
import Link from 'next/link';

function CurrentUserPage({}: Props) {
  const [object, setObject]=useState<any[]>([]);
  const [favourites, setFavourites]=useState<any[]>([]);
  const [userObject, setUserObject]=useState<any>(null);
  const router= useRouter();
  const {user}=useAuthContext();
  interface tabObject{
    id:number,
    content:string,
    tabIcon:IconType
  }
  const [activeTab, setActiveTab]=useState<number>(0);
const tabs:tabObject[]=[{id:1, content:'Properties', tabIcon:BsFillHousesFill}, {id:2, content:'Notifications', tabIcon:IoIosNotifications}, {id:3, content:'Favourited', tabIcon:FaStar}]



const getDataNeeded= useCallback(async ()=>{
  if(user){
    const {data:yourListings, error:yourListingsError} = await supabase.from('listings').select('*').eq('listed_by', user.id);

    if(!yourListingsError){
      setObject(yourListings);
    }
  
    const {data:userDatas}= await supabase.from('users').select('*').eq('user_id', user.id).limit(1);
   
    if(userDatas && userDatas.length > 0){
      setUserObject(userDatas[0]);
    }

    const {data, error}= await supabase.from('users').select('favourite_properties').eq('email', user.email).limit(1);

if(data && data.length > 0){
  (data as any[])[0].favourite_properties.map(async (item:string)=>{
  const {data:propertyData} = await supabase.from('listings').select('*').eq('id', item).limit(1);
  if(propertyData && propertyData.length > 0){
    setFavourites([...favourites, propertyData[0]]);
  }
  })
}


  }
}, [favourites, user]);

useEffect(()=>{
  getDataNeeded();

}, []);



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
    <button onClick={()=>router.push('/update-profile')} className='bg-purple p-2 rounded-xl text-white flex gap-2 items-center justify-center max-w-52 w-full'>Edit profile <FaPencil/> </button>
    </div>
    </div>

    <div role="tablist" className="tabs tabs-bordered border-purple max-w-xl mx-auto m-0">
        {tabs.map((tabItem)=>(<a onClick={()=>setActiveTab(tabItem.id)} key={tabItem.id} role='tab' className={`tab ${activeTab === tabItem.id && 'tab-active text-purple'} font-bold flex items-center gap-2`}>
            <p className='sm:hidden lg:block'>{tabItem.content}</p>
            <tabItem.tabIcon className={`${activeTab === tabItem.id ? 'text-purple' : 'text-white'} text-lg`}/>
            </a>))}
</div>

{activeTab === 1 && object.length > 0 && <div className='flex flex-col mx-auto m-0 items-center my-2 gap-2 max-h-96 overflow-y-scroll'>
  {object.map((item:any)=>(<Offer listedBy={item.listed_by} key={item.id} photoURL={item.images[0]} offerTitle={item.property_name} bathRooms={item.bathrooms} bedRooms={item.bedrooms} isForRent={item.rent_offer} price={item.price} squareMetrage={item.square_footage} id={item.id}/>))}
  </div>}
  {activeTab === 2 && userObject && userObject.notifications.length > 0 && <div>
    {userObject.notifications.map((item)=>(<Link className='bg-purple max-w-lg flex gap-2 self-center my-2 items-center w-full rounded-xl p-2 text-white' href={`/channel/${item.roomId}`} key={item.roomId}>
      <IoIosNotifications className='text-yellow-400 text-3xl'/>
      <p>{item.message}</p>
    </Link>))}
    </div>}
  {activeTab === 3 && <>  
<div className={`flex mx-auto m-0 justify-center items-center flex-wrap gap-4 max-w-5xl p-4`}>
{favourites.length === 0 && <p className='text-white text-lg'>No favourite properties yet.</p>}
{favourites.length > 0 && favourites.map((item)=>(<Offer key={item.id} photoURL={item.images[0]} listedBy={item.listed_by} offerTitle={item.property_name} bathRooms={item.bathrooms} bedRooms={item.bedrooms} isForRent={item.rent_offer} price={item.price} id={item.id} squareMetrage={item.square_footage}/>))}
</div>
  </>}
</>
    
    }
    </div>
  )
}

export default CurrentUserPage