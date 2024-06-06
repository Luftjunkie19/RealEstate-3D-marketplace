import React from 'react'

type Props = {}

function Chat({params}: {params:{chatId:string}}) {
  const {chatId}=params;
  return (
    <div className='h-screen w-full'>
<div className="max-h-[calc(100vh-4rem)] h-full w-full">
{chatId}
</div>
<div className="w-full sticky bottom-0 left-0 flex items-center justify-around gap-2 max-h-16 h-full p-4 bg-darkGray border-t border-purple rounded-t-xl">
<textarea name="message" className='sm:max-w-xs xl:max-w-md w-full resize-none max-h-12 text-white p-3 overflow-y-hidden rounded-lg border-purple border'></textarea>
<button className='bg-bgColor border-purple border px-6 py-2 rounded-full text-white'>Send</button>
</div>
    </div>
  )
}

export default Chat