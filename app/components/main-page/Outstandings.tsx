import React from 'react'
import { TbBuildingEstate } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { RiRobot3Fill } from "react-icons/ri";

import { BsHouseHeartFill } from "react-icons/bs";
type Props = {}

export default function Outstandings({}: Props) {
  return (
      <div className='flex sm:flex-wrap xl:flex-nowrap gap-2 items-center justify-center py-6 px-2 border-t-2 border-b-2 border-darkGray'>
          <div className="bg-darkGray max-w-xs w-full p-6 rounded-lg flex flex-col gap-8 items-center justify-center">
              <BsHouseHeartFill className='text-purple text-5xl' />
              <p className='text-white  '>Find Your Dream Home</p>
          </div>
          <div className="bg-darkGray max-w-xs w-full p-6 rounded-lg flex flex-col gap-8 items-center justify-center">
              <IoWallet className='text-purple text-5xl' />
              <p className='text-white  '>Unlock Property Value</p>
          </div>
        
          <div className="bg-darkGray max-w-xs w-full p-6 rounded-lg flex flex-col gap-8 items-center justify-center">
              <FaChartLine className='text-purple text-5xl' />
              <p className='text-white  '>Supervise Your Income</p>
          </div>

              <div className="bg-darkGray max-w-xs w-full p-6 text-center rounded-lg flex flex-col gap-8 items-center justify-center">
              <RiRobot3Fill className='text-purple text-5xl' />
              <p className='text-white text-nowrap'>Use Our VirtuAIssistant</p>
          </div>

    </div>
  )
}