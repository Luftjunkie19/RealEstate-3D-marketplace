import Image from 'next/image'
import React from 'react'

type Props = {propertyImage:string, propertyName:string, propertyId:string, propertyPrice:number, isRent:boolean}

function PromotedListing({propertyId, propertyImage, propertyName, propertyPrice, isRent}: Props) {
  return (
    <div className='flex bg-darkGray items-center justify-between p-2 w-full rounded-xl border border-purple'>
        <div className="flex gap-2 items-center text-white">
            <Image src={propertyImage} width={48} height={48} className='w-12 h-12 rounded-lg' alt=''/>
            <div className="flex flex-col gap-1">
            <p className='text-xs'>{propertyName}</p>
            {isRent ? <p className='text-green-400 font-semibold'>{propertyPrice} $/month</p> : <p className='text-green-400 font-semibold'>{propertyPrice} $</p>}
            </div>
        </div>
        <button className='p-2 bg-purple text-bgColor rounded-xl'>Show</button>
    </div>
  )
}

export default PromotedListing