'use client';
import React from 'react'
import {MoonLoader} from 'react-spinners';

type Props = {}

function Loader({}: Props) {
  return (
    <div className='w-full max-h-96 h-full flex flex-col justify-center items-center gap-4 p-2'>
        <MoonLoader size={70} color='#703BF7'/>
        <p className='text-white'>Loading...</p>
    </div>
  )
}

export default Loader