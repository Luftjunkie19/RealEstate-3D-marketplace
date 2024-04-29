import React from 'react'
import GoogleLogo from '@/assets/googleLogo.png';
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa6'
import Image from 'next/image';

type Props = {}

function Page({}: Props) {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center">

<form className="mx-auto m-0 my-8 max-w-xl w-full bg-darkGray rounded-xl p-4 flex flex-col gap-4">
    <p className='text-2xl font-medium text-white text-center'>Start seeking for your dream house.</p>
    <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-lg">Username</p>
                  <input className="max-w-sm w-full p-2 rounded-lg"/>
    </div>

      <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-lg">Email</p>
                  <input className="max-w-sm w-full p-2 rounded-lg"/>
    </div>

      <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-lg">Password</p>
                  <input className="max-w-sm w-full p-2 rounded-lg"/>
    </div>

    <button className="button bg-purple text-white text-lg p-2 rounded-lg max-w-xs w-full font-medium self-center">Sign In</button>
</form>
        
          <div className="flex flex-wrap gap-4">
              <button className=' bg-gray-600 border-2 border-darkGray p-4 rounded-lg text-red-500'>
                  <Image src={GoogleLogo} width={48} height={48} alt='' className='w-12 h-12 object-cover' />
              </button>
              <button className='bg-purple border-2 border-darkGray p-4 rounded-lg text-white'>
                  <FaDiscord size={48}/>
              </button>
              <button className='bg-darkGray border-2 border-darkGray p-4 rounded-lg text-white'>
                  <FaGithub size={48}/>
              </button>
</div>

    </div>
  )
}

export default Page