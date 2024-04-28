import React from 'react'
import { TbBuildingEstate } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { BsHouseHeartFill } from "react-icons/bs";
type Props = {}

export default function Outstandings({}: Props) {
  return (
      <div className='flex gap-6 items-center justify-around py-6 px-2 border-t-2 border-b-2 border-darkGray'>
          <div className="bg-darkGray max-w-xs w-full p-8 rounded-lg flex flex-col gap-8 items-center justify-center">
              <BsHouseHeartFill className='text-purple text-5xl' />
              <p className='text-white  '>Find Your Dream Home</p>
          </div>
          <div className="bg-darkGray max-w-xs w-full p-8 rounded-lg flex flex-col gap-8 items-center justify-center">
              <IoWallet className='text-purple text-5xl' />
              <p className='text-white  '>Unlock Property Value</p>
          </div>
        
          <div className="bg-darkGray max-w-xs w-full p-8 rounded-lg flex flex-col gap-8 items-center justify-center">
              <FaChartLine className='text-purple text-5xl' />
              <p className='text-white  '>Supervise Your Income</p>
          </div>

              <div className="bg-darkGray max-w-xs w-full p-8 rounded-lg flex flex-col gap-8 items-center justify-center">
              <TbBuildingEstate className='text-purple text-5xl' />
              <p className='text-white'>Effortless Property Management</p>
          </div>

    </div>
  )
}