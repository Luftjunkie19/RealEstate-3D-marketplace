import { usePubSub } from '@videosdk.live/react-sdk'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { FaRegMessage } from 'react-icons/fa6'
import { IoCloseCircle } from 'react-icons/io5'

type Props = {shownChat:boolean, closeChat:()=>void, }

function ChatDrawer({shownChat, closeChat}: Props) {
  const inputRef= useRef<HTMLInputElement>(null);

  const {publish, messages}=usePubSub('Chat', {
    onMessageReceived(message) {
      toast(`${message.senderName} sent a message.`);
    },

  });

  const sendMessage=(formData:FormData)=>{
    const message= formData.get('message');

    if(!message || message.toString().trim().length === 0){
      toast.error('No message provided yet.');
      return;
    }
    publish(message as string, {persist:true});
    if(inputRef.current){
      inputRef.current.value='';
      inputRef.current.defaultValue='';
    }
  }


  return (
    <div className={`sm:fixed lg:sticky lg:col-span-4 xl:col-span-3 3xl:col-span-2 w-full sm:z-[100] lg:z-0 duration-500 rounded-l-lg h-fit top-0 ${shownChat ? 'right-0 block' : '-right-full hidden'} bg-darkGray/95 transition-all`}>
<div className="w-full z-50 p-2 border-b-2 border-bgColor flex gap-6 justify-between">
    <p className='text-white flex gap-4 items-center'>Chat<FaRegMessage className="text-xl text-purple"/></p>
<button onClick={closeChat}><IoCloseCircle className='text-red-500 text-3xl'/></button>
</div>
<div className="h-[calc(100vh-10rem)] overflow-y-auto p-2 flex flex-col gap-4">
  {messages.map((message)=>(<div key={message.id} className='bg-purple text-white p-2 rounded-lg max-w-64 w-fit flex gap-1'>
    <p className='text-white text-bold'>{message.senderName}:</p>
    <p className='text-white'>{message.message}</p>
  </div>))}
</div>
<form action={sendMessage} className="h-16 p-2 w-full z-[99999999] bg-bgColor/80 rounded-b-lg flex gap-2 items-center">
<input ref={inputRef} type="text" name='message' className=' rounded-lg bg-darkGray text-white p-2 outline-none border-none' />
<button className='h-fit px-4 py-2 rounded-lg bg-purple text-white'>Send</button>
</form>
    </div>
  )
}

export default ChatDrawer