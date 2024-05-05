'use client'
import { RiRobot3Line } from "react-icons/ri";
import { useChat } from 'ai/react'
import { useEffect, useRef } from "react";
type Props={
  openState:boolean
}
export default function Chat({openState}:Props) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const chatRef=useRef<HTMLDivElement>(null);


  useEffect(() => {
    //3️⃣ bring the last item into view  
    if(chatRef.current) chatRef.current.lastElementChild?.scrollIntoView();
}, [messages]);

  return (
    <div className={`${openState ? 'flex' : 'hidden'} transition-all  flex-col gap-6 fixed bottom-10 right-6 w-full max-h-96 h-full bg-purple rounded-lg max-w-xs`}>
   <p className="text-white text-lg p-4 font-bold justify-around flex gap-4 items-center w-full border-b-2 border-darkGray"><RiRobot3Line size={24} className="text-bgColor"/> Virtu AIssistant</p>
   <div ref={chatRef} className="flex h-5/6 w-full p-1 flex-col gap-2 overflow-y-auto will-change-scroll modal-scroll cursor-all-scroll ">
   {messages.map(m => (
        <div key={m.id} className={`text-white ${m.role === 'user' ? 'self-start' : 'self-end'} bg-darkGray p-2 rounded-lg w-fit`}>
          <p className='flex gap-2 items-center text-wrap text-left'>{m.role === 'user' ? 'User: ' : 'AI: '} {m.content}</p>
         
        </div>
      ))}
   </div>

      <form onSubmit={handleSubmit} className='bg-darkGray rounded-b-lg w-full p-2'>
        <input
          className="w-full p-2 rounded-lg outline-none text-white shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}