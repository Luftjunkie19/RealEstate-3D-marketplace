import Link from 'next/link';
import React from 'react'
import { FaSignInAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
type Props = {}

function Navbar({}: Props) {
  return (
      <div className=' bg-darkGray w-screen sticky top-0 left-0 z-[100] border-b border-bgColor border-2 flex justify-between items-center p-1'>
          <p className='sm:text-lg lg:text-xl xl:text-2xl font-bold text-white'>Virtu<span className='text-purple'>Estate</span></p>

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
        <Link href={'/sign-up'}>
              <button className="bg-purple p-2 flex gap-2 items-center text-white rounded-xl">
                  <FaSignInAlt />
                  Sign In
              </button>
        </Link>
          </div>
    </div>
  )
}

export default Navbar