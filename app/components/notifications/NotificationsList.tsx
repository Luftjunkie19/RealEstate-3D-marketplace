import { supabase } from '@/utils/supabase/client';
import { getCurrentObject } from '@/utils/supabase/getCurrentObject';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {currentData:any, filter?:string, setCurrentData:(data:any)=>void, userId:string}

function NotificationsList({currentData, filter, setCurrentData, userId}: Props) {
const router= useRouter();
const loadNotifications=useCallback(()=>{
    getCurrentObject('notifications', filter as string, setCurrentData);
}, [filter, setCurrentData]);

useEffect(()=>{
    loadNotifications();
},[loadNotifications]);

const readNotification=async (notification:any)=>{
    await supabase.from('users').update({notifications: [...currentData.notifications.filter((item:any)=>item.roomId !== notification.roomId)]}).eq('user_id', userId);
}

const goToChannel= async (notification:any)=>{

    const {data}= await supabase.from('conferences').select('*').eq('room_id', notification.roomId).limit(1);

    if(data && data.length > 0){
        if(data[0].finished_at){
         toast.error('No redirection possible, Conference finished.');   
         return;
        }else{
                router.push(`/channel/${notification.roomId}`);
                await readNotification(notification);
        }
    }
}

    

  return (
    <>
        {currentData.notifications.map((notification,i)=>(<div className='bg-purple text-white p-2 rounded-xl flex gap-2 items-center' key={notification.roomId}>
            <p>{notification.message.length > 60 ? `${notification.message.slice(0, 40)}...` :  notification.message}</p>

            <div className="flex gap-2 items-center">
                <button onClick={async ()=>{
                   await goToChannel(notification);
                }} className='bg-green-500 py-2 rounded-xl h-fit px-4'>Join</button>
                <button onClick={async ()=>{
                    await readNotification(notification);
                }} className='bg-red-500 px-4 py-2 rounded-xl h-fit'>Ignore</button>
            </div>
        </div>))}
        
     
    </>
  )
}

export default NotificationsList