'use client';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import Image from 'next/image';
import React, { useState } from 'react'
import {formatDistance, formatDistanceToNow} from 'date-fns'
import { IconType } from 'react-icons/lib';
type Props = {}
import { BsFillHousesFill } from "react-icons/bs";
import { FaMessage, FaStar } from 'react-icons/fa6';

function CurrentUserPage({}: Props) {
  const {user}=useAuthContext();
  interface tabObject{
    id:number,
    content:string,
    tabIcon:IconType
  }
  const [activeTab, setActiveTab]=useState<number>(0);
const tabs:tabObject[]=[{id:1, content:'Properties', tabIcon:BsFillHousesFill}, {id:2, content:'Messages', tabIcon:FaMessage}, {id:3, content:'Favourited', tabIcon:FaStar}]

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
    </div>
    </div>

    <div role="tablist" className="tabs tabs-bordered border-purple max-w-xl mx-auto m-0">
        {tabs.map((tabItem)=>(<a onClick={()=>setActiveTab(tabItem.id)} key={tabItem.id} role='tab' className={`tab ${activeTab === tabItem.id && 'tab-active text-purple'} font-bold flex items-center gap-2`}>
            {tabItem.content}
            <tabItem.tabIcon className={`${activeTab === tabItem.id ? 'text-purple' : 'text-white'}`}/>
            </a>))}
</div>

<div className="flex flex-wrap gap-4 mx-auto m-0 p-4 max-w-screen-2xl">

</div>
</>
    
    }
    </div>
  )
}

export default CurrentUserPage