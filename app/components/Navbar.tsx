'use client';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import Link from 'next/link';
import React from 'react'
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaUser } from 'react-icons/fa6';
import { IoMenu } from "react-icons/io5";
type Props = {}

function Navbar({}: Props) {

  const {user, dispatch}=useAuthContext();

  const handleSignOut= async()=>{
    await fetch('/api/signOut');
    if(dispatch) dispatch({type:'LOGOUT', payload:null});
  }


  return (
      <div className=' bg-darkGray w-screen sticky top-0 left-0 z-[100] border-b border-bgColor border-2 flex justify-between items-center p-1'>
          <Link href={'/'} className='sm:text-lg lg:text-xl xl:text-2xl font-bold text-white'>Virtu<span className='text-purple'>Estate</span></Link>

<button className="sm:block lg:hidden mr-4">
  <IoMenu size={24} className='text-white'/>
</button>
          <div className="gap-6 mr-8 items-center sm:hidden lg:flex">
              <Link href={'/browse'}>
                  Browse
              </Link>
               <Link href={'/list-estate'}>
                  Add Estate
        </Link>
        {!user ?  
        <Link href={'/sign-in'}>
              <button className="bg-purple p-2 flex gap-2 items-center text-white rounded-xl">
                  <FaSignInAlt />
                  Sign In
              </button>
        </Link> : <Link className='flex items-center gap-4' href={'/profile'}>
          <FaUser/>
          Profile
        </Link>
        }

        {user && <button onClick={handleSignOut} className=' bg-red-600 flex items-center gap-2 text-white p-2 rounded-xl'>
          Sign Out
          <FaSignOutAlt />
        </button>}
          </div>
    </div>
  )
}

export default Navbar