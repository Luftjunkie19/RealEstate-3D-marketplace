'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

function NotificationDisplay({}: Props) {
const {user}=useAuthContext();
const [notifications, setNotifications]=useState([]);
const router=useRouter();

const getNotifications=useCallback(async ()=>{
const {data}= await supabase.from('users').select('*').eq('user_id', user?.id).limit(1);
if(data && data.length > 0 ){
    setNotifications(data[0].notifications);
}
}, [user?.id]);

useEffect(()=>{
    getNotifications();
},[getNotifications]);


const readNotification=async (notification:any)=>{
    await supabase.from('users').update({notifications: [...notifications.filter((item:any)=>item.roomId !== notification.roomId)]}).eq('user_id', user?.id);
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
    <div className={`${notifications.filter((item:any)=>!item.hasRead).length > 0 ? 'fixed bottom-0 left-0 overflow-y-auto max-h-80 flex flex-col gap-2 max-w-sm w-full p-2 z-[999999]' : 'hidden'}`}>
        {notifications.filter((item:any)=>item.hasRead !== true).map((notification:any)=>(<div className='bg-purple text-white p-2 rounded-xl flex gap-2 items-center' key={notification.roomId}>
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
    </div>
  )
}

export default NotificationDisplay