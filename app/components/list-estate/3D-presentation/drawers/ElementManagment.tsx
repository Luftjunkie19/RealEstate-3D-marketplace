import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'

type Props = {}

function ElementManagment({}: Props) {
  return (
    <div className='h-screen max-w-xl fixed top-0 right-0 w-full bg-purple'>
        <div className="flex justify-between items-center p-4">
            <p>VirtuEstate</p>
            <button><FaCircleXmark className='text-red-500'/></button>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p>Width</p>
                <input type="range" min={0} max="100"  className="range range-primary" />
            </div>
            <div className="flex flex-col gap-2">
                <p>Height</p>
                <input type="range" min={0} max="100"  className="range range-primary" />
            </div>
            <div className="flex flex-col gap-2">
                <p>Depth</p>
                <input type="range" min={0} max="100"  className="range range-primary" />
            </div>
        </div>
    </div>
  )
}

export default ElementManagment