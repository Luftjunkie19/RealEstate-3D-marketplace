'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

function Chat({params}: {params:{chatId:string}}) {
  const [chat, setChat]=useState<any>(null);
  const {chatId}=params;
  const {user}=useAuthContext();
  const router= useRouter();
  const  chatRef=useRef<HTMLDivElement>(null);

  const loadChatData=useCallback(async ()=>{
const {data:chatData}= await supabase.from('chats').select('*').eq('id', chatId).limit(1);


if(chatData && chatData.length > 0){
setChat(chatData[0]);
}else{
  router.push('/');
}

  },[chatId, router]);

  useEffect(()=>{
    loadChatData();
  },[loadChatData]);


const sendMessage= async (formData:FormData)=>{

  const messageInput= formData.get('message');

  if(!messageInput || messageInput.toString().trim().length === 0){
    toast.error('Please enter a message', {
      position:"bottom-right"
    });
    return;
  }

  const {data:userObject}= await supabase.from('users').select('*').eq('user_id', user?.id).limit(1);
  if(chat && userObject && user && chat.users_allowed.find((id)=>id === user.id)){
    await supabase.from('chats').update({messages:[...chat.messages, {content:messageInput, senderId:user.id, sentAt:new Date().getTime(), senderName:userObject[0].user_name, senderImg: userObject[0].profile_image}]}).eq('id', chatId);
  }else{
    toast.error('You are not allowed to participate in this chat.', {
      position:'bottom-right'
    })
  }
}



  return (
    <div className='h-screen w-full'>
<div ref={chatRef} className="max-h-[calc(100vh-4rem)] h-full w-full overflow-y-auto p-2">
{chat && chat.messages.length === 0 && <p>Initiate the chat......</p>}
{chat && chat.messages.length > 0 &&  chat.messages.sort((a,b)=>a.sentAt - b.sentAt).map((item, i)=>(<div key={i} className={`${item.senderId === user?.id ? 'chat chat-start ' : 'chat chat-end'}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <Image width={32} height={32} alt="Tailwind CSS chat bubble component" src={item.senderImg ? item.senderImg : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
    </div>
  </div>
    <div className="chat-header text-white">
    {item.senderName}, {' '}
    <time className="text-xs opacity-50">{formatDistanceToNow(item.sentAt)}</time>
  </div>
  <div className={`chat-bubble sm:max-w-xs md:max-w-lg  ${item.senderId === user?.id ? 'bg-purple border border-darkGray text-white' : 'bg-darkGray border border-purple text-white'}`}>{item.content}</div>
</div>))}
</div>
<form action={sendMessage} className="w-full sticky bottom-0 left-0 flex items-center justify-around gap-2 max-h-16 h-full p-4 bg-darkGray border-t border-purple rounded-t-xl">
<textarea placeholder='Enter message...' name="message" className='sm:max-w-xs xl:max-w-md w-full resize-none max-h-12 text-white outline-none p-2 overflow-y-hidden rounded-lg border-purple border'></textarea>
<button className='bg-bgColor border-purple border px-6 py-2 rounded-full text-white'>Send</button>
</form>
    </div>
  )
}

export default Chat