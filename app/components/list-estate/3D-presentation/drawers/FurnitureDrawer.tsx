import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'

type Props = {isOpen?:boolean, close?:()=>void}

function FurnitureDrawer({isOpen, close}: Props) {
  return (
    <div className={`fixed top-0 left-0 transition-all bg-bgColor h-full p-2 ${isOpen ? 'translate-x-0 z-[9999]' : '-translate-x-full'} max-w-3xl w-full`}>
        <div className="flex justify-between items-center p-2">
<p className="text-2xl text-white">Virtu<span className='text-purple font-bold'>Estate</span></p>
<button onClick={close}>
                <FaCircleXmark className='text-red-500 text-2xl'/>
            </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          
        </div>
    </div>
  )
}

export default FurnitureDrawer