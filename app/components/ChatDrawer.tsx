import React from 'react'
import { FaRegMessage } from 'react-icons/fa6'
import { IoCloseCircle } from 'react-icons/io5'

type Props = {shownChat:boolean, closeChat:()=>void, content:React.ReactNode}

function ChatDrawer({shownChat, closeChat, content}: Props) {
  return (
    <div onClick={closeChat} className={` fixed h-full duration-500 z-[100] rounded-l-lg min-h-screen bottom-0 ${shownChat ? 'right-0 block' : '-right-full hidden'} bg-darkGray/95 max-w-64 w-full lg:hidden transition-all`}>
<div className="w-full z-50 p-2 border-b-2 border-bgColor flex gap-6 justify-between">
    <p className='text-white flex gap-4 items-center'>Chat<FaRegMessage className="text-xl text-purple"/></p>
<button onClick={closeChat}><IoCloseCircle className='text-red-500 text-3xl'/></button>
</div>
{content}
    </div>
  )
}

export default ChatDrawer