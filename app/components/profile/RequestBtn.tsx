'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import React from 'react'
import toast from 'react-hot-toast';
import { HiUserPlus } from 'react-icons/hi2';

type Props = {invitedId:string}

function RequestBtn({invitedId}: Props) {

    const {user}=useAuthContext();

    const sendFriendshipRequest= async ()=>{
        const {data:invitedUsersData}= await supabase.from('users').select('*').eq('user_id', invitedId);
if(invitedUsersData && !invitedUsersData[0].notifications.find((notification:any)=>notification.sentBy === user?.id && notification.sentTo === invitedId && !notification.hasRead)){
    await supabase.from('users').update({notifications:[...invitedUsersData[0].notifications, {content:`You've got a contact request.`, sentBy:user?.id, sentTo:invitedId, hasRead:false, createdAt:new Date().getTime() }]}).eq('user_id', invitedId);
    toast.success('Successfully sent request', { position:'bottom-right'
    })
}else{
    toast.error(`You cannot send request if that person hasn't read your previous request yet.`, {
        position:'bottom-right',
        
    })
}

    }


  return (
    <button onClick={sendFriendshipRequest} className={`bg-purple p-2 rounded-lg ${user && user.id !== invitedId ? 'flex items-center gap-2 text-white' : 'hidden'}`}>
        Send Request <HiUserPlus/>
    </button>
  )
}

export default RequestBtn