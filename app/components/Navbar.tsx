import Link from 'next/link';
import React from 'react'
import { FaSignInAlt } from "react-icons/fa";

type Props = {}

function Navbar({}: Props) {
  return (
      <div className=' bg-darkGray sticky top-0 left-0 z-[100] border-b border-bgColor border-2 flex justify-between items-center p-2'>
          <p className='text-3xl font-bold text-white'>Virtu<span className='text-purple'>Estate</span></p>
          <div className="flex gap-6 items-center">
              <Link href={'/browse'}>
                  Browse
              </Link>
               <Link href={'/list-estate'}>
                  Add Estate
            </Link>
              <button className="bg-purple p-2 flex gap-2 items-center text-white rounded-xl">
                  <FaSignInAlt />
                  Sign In
              </button>
          </div>
    </div>
  )
}

export default Navbar