'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { RiRobot3Line } from "react-icons/ri";
import Chat from './Chat';
import OpenBtn from './OpenBtn';
import { supabase } from '@/utils/supabase/client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';



function HelperChat() {
    const [open, setOpen]=useState<boolean>(false);
    const toggleState=()=>{
        setOpen(!open);
    }
    const {user:userData}=useAuthContext();
    const [user, setUser] = useState<any>(null);

    const getUserData = useCallback(()=>{
        supabase.from('users').select('*').eq('user_id', userData?.id).limit(1).then((response)=>{
            if(response.data && response.data?.length > 0){
                setUser(response.data[0]);
            }
        });
    }, [userData?.id]);
  
    useEffect(()=>{
      getUserData();
    },[getUserData]);

  return (
    <>
   <OpenBtn userData={user} open={open} toggleOpenState={toggleState}/>
        <Chat user={user} openState={open}/>
    </>
  )
}

export default HelperChat