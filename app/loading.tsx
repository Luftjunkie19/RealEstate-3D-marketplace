import React from 'react'
type Props = {}
import {FadeLoader} from 'react-spinners';
function Loading({}: Props) {
  return (
    <div className='w-full h-screen flex flex-col gap-4 justify-center items-center'>
  <FadeLoader width={128} height={128} color='#703BF7'/>
  <p className='text-white'>Loading...</p>
    </div>
  )
}

export default Loading