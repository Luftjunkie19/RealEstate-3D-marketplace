'use client';


import React from 'react'
import GoogleLogo from '@/assets/googleLogo.png';
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa6'
import Image from 'next/image';


type Props = {}

function Page({}: Props) {



  const formActionHandler=async (form:FormData)=>{
const username = form.get('username');
const email = form.get('email');
const password = form.get('password');

const fetchData= await fetch('/api/signIn/credentials', {
  method:'POST',
  body:JSON.stringify({
    username,
    email,
    password
  }),
  headers:{
    'Content-Type':'application/json'
  }
})

const fetchRes= await fetchData.json();

console.log(fetchRes);



  }

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center">

<form action={formActionHandler} className="mx-auto m-0 my-8 max-w-xl w-full bg-darkGray rounded-xl p-4 flex flex-col gap-4">
    <p className='text-2xl font-medium text-white text-center'>Start seeking for your dream house.</p>
    <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-lg">Username</p>
                  <input name='username' className="max-w-sm w-full p-2 rounded-lg"/>
    </div>

      <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-lg">Email</p>
                  <input name='email' className="max-w-sm w-full p-2 rounded-lg"/>
    </div>

      <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-lg">Password</p>
                  <input name='password' className="max-w-sm w-full p-2 rounded-lg"/>
    </div>

    <button type='submit' className="button bg-purple text-white text-lg p-2 rounded-lg max-w-xs w-full font-medium self-center">Sign In</button>
</form>
        
          <div className="flex flex-wrap gap-4 p-3">
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