import React from 'react'
import ChatBar from '../components/chat/ChatBar'

type Props = {children:React.ReactNode}

function layout({children}: Props) {
  return (
    <div className='h-screen w-full flex'>
      <ChatBar/>
      {children}</div>
  )
}

export default layout