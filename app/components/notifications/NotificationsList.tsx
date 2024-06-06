import { supabase } from '@/utils/supabase/client';
import { getCurrentObject } from '@/utils/supabase/getCurrentObject';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import JoinConferenceRequest from './notification-type/JoinConferenceRequest';
import ContactRequest from './notification-type/ContactRequest';

type Props = {currentData:any, filter?:string, setCurrentData:(data:any)=>void, userId:string}

function NotificationsList({currentData, filter, setCurrentData, userId}: Props) {
const router= useRouter();
const [listerObj, setListerObj]=useState(currentData);
const loadNotifications=useCallback(()=>{
    getCurrentObject('notifications', filter as string, setListerObj);
}, [filter]);

useEffect(()=>{
    loadNotifications();
},[loadNotifications]);

const readNotification=async (notification:any)=>{
    await supabase.from('users').update({notifications: [...listerObj.notifications.filter((item:any)=>item.roomId !== notification.roomId)]}).eq('user_id', userId);
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
        {listerObj.notifications.filter((notification)=>!notification.hasRead).map((notification,i)=>(notification.roomId ? <JoinConferenceRequest goToChannel={goToChannel} notification={notification} key={i} readNotification={readNotification}/> : <ContactRequest userId={userId} notification={notification} userData={listerObj} key={i}/>))}
        
     
    </>
  )
}

export default NotificationsList