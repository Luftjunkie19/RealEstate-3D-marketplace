'use client';

import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

type Props = {isShown:boolean, closeDrawer:()=>void, user:User, handleSignOut:any}

function Drawer({isShown, closeDrawer, user, handleSignOut}: Props) {
  return (
    <div className={`fixed transition-all top-0 z-[90] items-center  justify-around gap-8  ${isShown ? 'right-0' : '-right-full'} flex  flex-col  max-w-md w-full h-screen bg-bgColor/95 `}>
      <div className="flex p-2 w-full self-end">
        <button className='text-red-500 text-4xl' onClick={closeDrawer}>
            <IoIosCloseCircle/>
        </button>
      </div>
    
    <div className="px-4 w-full self-center flex flex-col gap-6 text-white">
    <Link href={'/browse'} className='text-2xl'>
                  Browse
              </Link>
               <Link className='text-2xl' href={'/list-estate'}>
            
                  Add Estate
             
        </Link>
        {!user ?  
        <Link href={'/sign-in'}>
              <button className="bg-purple p-2 flex gap-2 items-center text-white rounded-xl">
                  <FaSignInAlt />
                  <span className='text-2xl'>
                  Sign In
                  </span>
              </button>
        </Link> : <Link className='flex items-center gap-2' href={'/profile'}>
          <FaUser/>
          <span className='text-2xl'>
          Profile
          </span>
        </Link>
        }

        {user && <button onClick={handleSignOut} className=' bg-red-600 max-w-48 flex items-center gap-2 text-white p-2 rounded-xl'>
          Sign Out
          <FaSignOutAlt />
        </button>}
    </div>
       

    </div>
  )
}

export default Drawer