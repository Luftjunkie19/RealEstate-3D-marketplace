'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'

type Props = {}

function ChatBar({}: Props) {
const [chats, setChats]=useState<any[]>([]);
const {user}=useAuthContext();

const loadParticipatedChats= useCallback(async ()=>{
    if(user){
        const {data}= await supabase.from('chats').select('*').contains('users_allowed', [user.id]);
        if(data){
            setChats(data);
        }
    }

}, [user]);

useEffect(()=>{
    loadParticipatedChats();
},[loadParticipatedChats]);

const pathname = usePathname();

  return (
    <div className={`max-w-xs rounded-tr-2xl border-purple border-r-2 border-t bg-darkGray p-2 h-full w-full ${pathname.includes('/chat/') ? 'sm:hidden lg:flex' : 'flex'}  flex-col overflow-y-auto gap-2`}>
        <p className='text-2xl text-white font-bold'>Conversations</p>
        <div className="flex flex-col gap-2">
            {chats.length > 0 && chats.map((item)=>(<Link href={`/chat/${item.id}`} className=' bg-bgColor border border-purple flex flex-col gap-2 p-2 rounded-t-2xl rounded-l-2xl text-white' key={item.id}>
   <div className="flex justify-between">
        <div className="flex items-center gap-2 self-start">
            <Image src={item.listing_img} width={32} height={32} alt='' className='w-10 h-10 rounded-lg'/>
            <p className="text-sm">{item.listing_name}</p>
        </div>
        <p className="text-xs self-center">{formatDistanceToNow(item.created_at)}</p>
   </div>
  {item.messages.length > 0 &&  <div className="flex justify-between items-center justify-self-end">
    <p className='text-white text-xs'>{item.messages[item.messages.length - 1].senderName.slice(0, 15)}: {item.messages[item.messages.length - 1].content.slice(0, 20)}...</p>
   <p className="text-sm font-bold text-purple">{formatDistanceToNow(item.messages[item.messages.length - 1].sentAt)}</p>
   </div>}
            </Link>))}
        </div>
    </div>
  )
}

export default ChatBar