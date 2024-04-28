'use client';

import React from 'react'
import FirstScene from './ThreeJS items/FirstScene';


type Props = {}

function HeroSection({}: Props) {
  return (
      <div className='m-0 mx-auto flex gap-6 p-2  justify-around'>
          <div className="flex flex-col self-center gap-6 py-8 pl-12">
          <div className="flex flex-col gap-2 max-w-xl">
                 <p className='text-white font-bold text-3xl'>Discover Your Dream </p>
            <p className="text-white">Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>
          </div>
              <div className="flex gap-5">
                    <button className='bg-purple w-72  text-white text-base font-bold p-3 rounded-lg'>Learn more</button>
                  <button className='bg-purple w-72 font-bold text-base  text-white p-3 rounded-lg'>Browse Properties</button>
              </div>

              <div className="grid grid-cols-2 gap-4 ">
                  <div className="flex w-80 gap-1 bg-darkGray flex-col p-4 rounded-lg">
                      <p className="text-white font-bold text-2xl">+{10}k</p>
                      <p>Properties</p>
                  </div>
                      <div className="flex w-80 gap-1 bg-darkGray flex-col p-4 rounded-lg">
                      <p className="text-white font-bold text-2xl">10</p>
                      <p>Years on the market</p>
                  </div>
                      <div className="flex w-full  gap-1 col-span-full  bg-darkGray flex-col p-4 rounded-lg">
                      <p className="text-white font-bold text-2xl">+200k</p>
                      <p>Satisfied Customers</p>
                  </div>
              </div>
          </div>
          
      <div className=" w-full max-w-lg max-h-[28rem]">
<FirstScene/>
      </div>
    </div>
  )
}

export default HeroSection