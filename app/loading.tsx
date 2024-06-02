import React from 'react'
type Props = {}

function Loading({}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
  <p className='text-white'>Loading...</p>
    </div>
  )
}

export default Loading