'use client'
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { usePathname } from 'next/navigation';
import React from 'react'
import { RiRobot3Line } from "react-icons/ri";
import { RiRobot3Fill } from "react-icons/ri";
type Props = {toggleOpenState:()=>void, open:boolean, userData:any}

function OpenBtn({toggleOpenState, open, userData}: Props) {
  const pathname = usePathname();
  const {user}=useAuthContext();

  return (
    <button onClick={toggleOpenState} className={`fixed ${user && userData && userData.is_subscribed || !pathname.includes('channel')  ? 'block' : 'hidden'} transition-all bottom-1 right-1 ${open ? 'bg-purple' : 'bg-red-500'} z-[99999999999999]  p-4 rounded-full`}>
   { open ? <RiRobot3Fill className='text-white'/> : <RiRobot3Line className='text-white'/>}
</button>
  )
}

export default OpenBtn