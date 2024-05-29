
'use client';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaUser } from 'react-icons/fa6';
import { IoMenu } from "react-icons/io5";
import Drawer from './Drawer';
import { User } from '@supabase/supabase-js';
import { useAtom } from 'jotai';
import { userThreadAtom } from '@/atoms';
import { supabase } from '@/utils/supabase/client';
type Props = {}

function Navbar({}: Props) {

  const [show, setShown]=useState(false);
  const [userThread, setUserThread]=useAtom(userThreadAtom);
  const [notifications, setNotifications]=useState([]);
  const openDrawer=()=>{
    setShown(true);
  }

  const closeDrawer=()=>{
    setShown(false);
  }
  const {user, dispatch}=useAuthContext();

  const fetchCreateThreadId= useCallback(async ()=>{
    if(user){
      if(!userThread){
        try {
        const fetchData= await fetch('/api/user-thread', {method:'POST', body:JSON.stringify({currentUser:user}), headers:{
          'Content-Type': 'application/json',
        }});
        const response = await fetchData.json();
  
        if(!response.success){
          return;
        }
  
          setUserThread(response.userThread);
        
        } catch (error) {
        setUserThread(null);  
        }
      }
      }
  }, [setUserThread, user, userThread]);
  useEffect(()=>{

    fetchCreateThreadId();


  },[fetchCreateThreadId]);

  const getNotifications=useCallback(async ()=>{
    if(user){
   const {data}= await supabase.from('users').select('*').eq('user_id', user?.id).limit(1);

   if(data && data.length > 0){
    setNotifications(data[0].notifications);
   }
  }
  }, [user]);

  useEffect(()=>{
    getNotifications();
  },[getNotifications])


  const handleSignOut= async()=>{
    await fetch('/api/signOut');

    dispatch!({type:'LOGOUT', payload:null});

  }


  return (
    <>
      <div className=' bg-darkGray w-screen sticky top-0 left-0 z-[100] border-b border-bgColor border-2 flex justify-between items-center p-1'>
          <Link href={'/'} className='sm:text-lg lg:text-xl xl:text-2xl font-bold text-white'>Virtu<span className='text-purple'>Estate</span></Link>

<button onClick={openDrawer} className="sm:block lg:hidden mr-4">
  <IoMenu size={24} className='text-white'/>
</button>
          <div className="gap-6 mr-8 items-center sm:hidden lg:flex">
              <Link href={'/browse'}>
                  Browse
              </Link>
        {!user ?  
        <Link href={'/sign-in'}>
              <button className="bg-purple p-2 flex gap-2 items-center text-white rounded-xl">
                  <FaSignInAlt />
                  Sign In
              </button>
        </Link>
         : 
         <>
            <Link href={'/list-estate'}>
                  Add Estate
        </Link>
         <Link className='flex items-center relative top-0 left-0 gap-2' href={'/profile'}>
          <FaUser/>
          Profile
        {notifications.length > 0 && <div className=' px-1 h-fit bg-red-500 rounded-full absolute bottom-0 right-0 text-white text-xs'>
          <p>{notifications.length}</p>
          </div>}
        </Link>
         </>
        }

        {user && <button onClick={handleSignOut} className=' bg-red-600 flex items-center gap-2 text-white p-2 rounded-xl'>
          Sign Out
          <FaSignOutAlt />
        </button>}
          </div>
    </div>
    <Drawer handleSignOut={handleSignOut} user={user as User} closeDrawer={closeDrawer} isShown={show}/>
    </>
  )
}

export default Navbar