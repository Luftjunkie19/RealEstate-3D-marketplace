import React from 'react'
import { FaMoneyBillWave, FaSearch } from "react-icons/fa";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { FaCube } from "react-icons/fa6";

import MainContent from '../components/browse/MainContent';

type Props = {}

function Page({}: Props) {
 

  return (
      <div className="min-h-screen w-screen">
          <div className="flex py-16 pl-8 flex-col gap-4 border-b-2 border-darkGray">
              <p className="sm:text-xl lg:text-3xl xl:text-5xl text-white font-bold">
                  Find Your Dream Property
              </p>
              <p className="max-w-5xl">
                  Welcome to VirtuEstate, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey
              </p>
          </div>

          <div className="flex flex-col mx-auto m-0 my-3">
              <div className="max-w-3xl self-center flex gap-4 items-center p-4 rounded-t-lg bg-darkGray">
                  <input className="p-2 w-full max-w-md rounded-lg outline-none" />
                  <button className="bg-purple rounded-xl p-3">
                       <FaSearch size={20} className='text-white'/>
                  </button>
              </div>

              <div className="flex sm:flex-col xl:flex-row flex-wrap gap-2 self-center items-center justify-center bg-darkGray rounded-lg sm:max-w-2xl xl:max-w-5xl w-full">
              <div className="flex gap-4 items-center p-4 rounded-lg ">
                  <IoLocationSharp size={18} className='text-white'/>
            <input className="p-2 rounded-lg outline-none text-white"/>
              </div>
                <div className="flex gap-4 items-center p-4 rounded-lg ">
                  <BiSolidBuildingHouse size={18} className='text-white'/>
            <input className="p-2 rounded-lg outline-none text-white"/>
              </div>
              
                      <div className="flex gap-4 items-center p-4 rounded-lg ">
                  <FaMoneyBillWave size={18} className='text-white'/>
            <input className="p-2 rounded-lg outline-none text-white"/>
        </div>
                  
                    
                      <div className="flex gap-4 items-center p-4 rounded-lg ">
                  <FaCube size={18} className='text-white'/>
            <input className="p-2 rounded-lg outline-none text-white"/>
        </div>
                  
              </div>

              

    
          </div>

    <MainContent/>     

    </div>
  )
}

export default Page