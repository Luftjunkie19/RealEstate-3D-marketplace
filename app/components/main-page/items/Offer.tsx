import React from 'react';

import Image, { StaticImageData } from 'next/image';
import { FaBath } from 'react-icons/fa';
import { GiHouseKeys } from 'react-icons/gi';
import { IoBed } from 'react-icons/io5';
import { MdSell } from 'react-icons/md';
import { RxRulerSquare } from 'react-icons/rx';

type Props = {imageUrl: StaticImageData, name:string, description: string, barthRooms:number, bedRooms:number, isForRent: boolean, price:number, squareMetrage:number}

function Offer({name, imageUrl, description, barthRooms, bedRooms, isForRent, price, squareMetrage}: Props) {
  return (
      <div className='p-6 flex flex-col gap-2 max-w-sm w-full border-2 border-darkGray rounded-xl shadow-lg overflow-hidden'>
       
          <Image src={imageUrl}  width={256} height={256} className='w-full object-cover p-2 h-64 rounded-lg'  alt=""/>
          
          <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold text-white">{name}</p>
              <p>{description.slice(0, 60)}...</p>
              <p className="flex gap-2 items-center"><RxRulerSquare size={12} /> {squareMetrage}^2 m</p>
          </div>
          <div className="flex gap-2">
              <div className="p-2 flex gap-1 items-center rounded-full border border-darkGray">
                  <IoBed size={12} />
                  <p className="text-sm">{bedRooms} Bedrooms</p>
              </div>

               <div className="p-2 flex gap-1 items-center rounded-full border border-darkGray">
                  <FaBath size={12} />
                  <p className="text-sm">{barthRooms} Bathrooms</p>
              </div>

              {!isForRent ? <div className="p-2 flex gap-1 border border-darkGray items-center rounded-full">
                  <MdSell size={12} />
                  <p className="text-sm">Sale</p>
              </div> : <div className="p-2 border border-darkGray flex gap-1 items-center rounded-full">
                  <GiHouseKeys size={12} />
                  <p className="text-sm">Rent</p>
              </div>}
          </div>
          <div className="flex p-2 justify-between items-center">
              <div className="flex flex-col gap-2">
                  <p className='text-xs'>Price</p>
                {isForRent ?   <p>{price}$ / month</p> :   <p>{price}$</p>}
              </div>

              <button className="bg-purple p-2 rounded-lg text-base text-white font-semibold"> View Details</button>
          </div>
    </div>
  )
}

export default Offer