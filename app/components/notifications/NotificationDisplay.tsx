'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import NotificationsList from './NotificationsList';

type Props = {}

function NotificationDisplay({}: Props) {
const {user}=useAuthContext();
const [notificationsOwner, setNotificationsOwner]=useState<any>(null);
const router=useRouter();

const getNotifications=useCallback(async ()=>{
const {data}= await supabase.from('users').select('*').eq('user_id', user?.id).limit(1);
if(data && data.length > 0 ){
    setNotificationsOwner(data[0]);
}
}, [user?.id]);

useEffect(()=>{
    getNotifications();
},[getNotifications]);



  return (
    <div className={`${notificationsOwner.notifications.filter((item:any)=>!item.hasRead).length > 0 ? 'fixed bottom-0 left-0 overflow-y-auto max-h-80 flex flex-col gap-2 max-w-sm w-full p-2 z-[999999]' : 'hidden'}`}>
        <NotificationsList userId={user?.id as string} setCurrentData={setNotificationsOwner} filter={`user_id=eq.${user?.id}`} currentData={notificationsOwner}/>
    </div>
  )
}

export default NotificationDisplay