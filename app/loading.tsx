import React from 'react'
import {RotatingLines} from 'react-loader-spinner'
type Props = {}

function Loading({}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
      <RotatingLines
  visible={true}
  width='96'
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  strokeColor='#703BF7'
  />
    </div>
  )
}

export default Loading