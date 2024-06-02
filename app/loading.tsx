import React from 'react'
import {InfinitySpin, RotatingLines} from 'react-loader-spinner'
type Props = {}

function Loading({}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
      <InfinitySpin
  width="120"
  color="#703BF7"
  />
  <p className='text-white'>Loading...</p>
    </div>
  )
}

export default Loading