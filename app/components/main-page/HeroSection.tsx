'use client';

import React from 'react';

import FirstScene from './ThreeJS items/FirstScene';

type Props = {}

function HeroSection({}: Props) {
  return (
      <div className='lg:m-0 lg:mx-auto flex sm:flex-col-reverse xl:flex-row gap-6 lg:p-2 justify-around'>
          <div className="flex flex-col xl:self-center gap-6 py-8 3xl:pl-12">
          <div className="flex flex-col gap-2 max-w-xl ">
                 <p className='text-white font-bold text-3xl'>Discover Your Dream </p>
            <p className="text-white">Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams, utilizing the power of AI.</p>
          </div>
              <div className="flex flex-wrap gap-5">
                    <button className='bg-purple w-72  text-white text-base font-bold p-3 rounded-lg'>Learn more</button>
                  <button className='bg-purple w-72 font-bold text-base  text-white p-3 rounded-lg'>Browse Properties</button>
              </div>

              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 ">
                  <div className="flex max-w-xs w-full gap-1 bg-darkGray flex-col p-4 rounded-lg">
                      <p className="text-white font-bold text-2xl">+{10}k</p>
                      <p>Properties</p>
                  </div>
                      <div className="flex max-w-xs w-full gap-1 bg-darkGray flex-col p-4 rounded-lg">
                      <p className="text-white font-bold text-2xl">10</p>
                      <p>Years on the market</p>
                  </div>
                      <div className="flex sm:col-span-1 lg:col-span-full gap-1 bg-darkGray flex-col p-4 rounded-lg">
                      <p className="text-white font-bold text-2xl">+200k</p>
                      <p>Satisfied Customers</p>
                  </div>
              </div>
          </div>
          
      <div className=" max-w-md max-h-[28rem]">
<FirstScene/>
      </div>
    </div>
  )
}

export default HeroSection