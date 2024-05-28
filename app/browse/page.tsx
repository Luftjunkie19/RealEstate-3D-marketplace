'use client';
import React, { useState } from 'react';

import { BiSolidBuildingHouse } from 'react-icons/bi';
import {
  FaMoneyBillWave,
  FaSearch,
} from 'react-icons/fa';
import { FaCube } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';

import { SelectItem } from '@/components/ui/select';

import MainContent from '../components/browse/MainContent';
import SelectionBar from '../components/Conference/items/SelectionBar';

type Props = {}

function Page({}: Props) {
const [filterName, setFilterName]=useState('');
const [selectedOption, setSelectedOption]=useState(null);
const [priceForProperty, setPriceForProperty]=useState(0);
const [squareMetrage, setSquareMetrage]=useState(0);

const [filters, setFilters]=useState<any[]>([]);

const submitFilters=()=>{
  let array:any[]=[];
  if(filterName.trim().length > 0){
      array.push([...filters, {filter:(properties:any[])=> properties.filter((property)=>property.property_name.includes(filterName) || property.address.includes(filterName))}]);
}

if(selectedOption){
  array.push([...filters, {filter:(properties:any[])=>properties.filter((property)=> selectedOption === "for_rent" ? property.rent_offer === true : property.rent_offer === false)}])
}

if(priceForProperty){
  array.push([...filters, {filter:(properties:any[])=>properties.filter((property)=>property.price <= priceForProperty)}])
}

if(squareMetrage){
  array.push([...filters, {filter:(properties:any[])=>properties.filter((property)=>property.square_footage <= squareMetrage)}])
}

console.log(array);

setFilters(array.flat());

}
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
              <div className="max-w-md self-center flex gap-4 items-center p-4 rounded-t-lg bg-darkGray">
                  <input className="p-2 w-full max-w-md rounded-lg outline-none" />
                  <button className="bg-purple rounded-xl p-3" onClick={submitFilters}>
                       <FaSearch size={20} className='text-white'/>
                  </button>
              </div>

              <div className="flex sm:flex-col lg:flex-row flex-wrap gap-2 self-center items-center justify-center bg-darkGray rounded-lg sm:max-w-2xl xl:max-w-6xl w-full">
              <div className="flex gap-4 items-center p-4 rounded-lg ">
                  <IoLocationSharp size={18} className='text-white'/>
            <input onChange={(e)=>setFilterName(e.target.value)} className="p-2 rounded-lg outline-none text-white"/>
              </div>
                <div className="flex gap-4 items-center p-4 rounded-lg">
                  <BiSolidBuildingHouse size={18} className='text-white'/>
                  <SelectionBar classes='max-w-xs min-w-36 w-full' placeholder={'Property type'} selectedOption={selectedOption as unknown as string} setChange={function (value: any): void {
             setSelectedOption(value);
            } }>
          <SelectItem value={'for_rent'}>For Rent</SelectItem>
          <SelectItem value={'for_sale'}>For Sale</SelectItem>
           </SelectionBar>
              </div>
              
            <div className="flex gap-4 items-center p-4 rounded-lg">
                  <FaMoneyBillWave size={18} className='text-white'/>
            <input onChange={(e)=>setPriceForProperty(+e.target.value)} type='number' min={0} className="p-2 rounded-lg outline-none text-white"/>
        </div>
                  
                    
                      <div className="flex gap-4 items-center p-4 rounded-lg ">
                  <FaCube size={18} className='text-white'/>
            <input onChange={(e)=>setSquareMetrage(+e.target.value)} type='number' min={0} className="p-2 rounded-lg outline-none text-white"/>
        </div>
                  
              </div>

              

    
          </div>

    <MainContent filters={filters}/>     

    </div>
  )
}

export default Page