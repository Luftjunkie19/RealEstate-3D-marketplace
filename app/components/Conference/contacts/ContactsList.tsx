'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext'
import { supabase } from '@/utils/supabase/client';
import React, { useCallback, useEffect, useState } from 'react'
import ContactItem from './ContactItem';

type Props = {roomId:string}

function ContactsList({roomId}: Props) {
    const {user}=useAuthContext();
    const [userObj, setUserObj]=useState<any>(null);

const setObject=useCallback(async ()=>{
    if(user){
        const {data}= await supabase.from('users').select('*').eq('user_id', user?.id).limit(1);
    if(data && data.length > 0){
        setUserObj(data[0]);
    }
    }
},[user]);

useEffect(()=>{
    setObject();
},[setObject])

  return (
    <div>
        {userObj && userObj.friends.length > 0  && userObj.friends.map((contact, i)=>(<ContactItem roomId={roomId} contactData={contact} key={i}/>))}
   {userObj && userObj.friends.length === 0 && <p className="text-white">You have no contacts yet...</p>}
    </div>
  )
}

export default ContactsList