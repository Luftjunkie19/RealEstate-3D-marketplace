import Image from 'next/image'
import React from 'react'

type Props = {propertyData:any}

function SucceededItem({propertyData}: Props) {
  return (
    <div className='text-white bg-darkGray/70 border border-green-400 rounded-lg p-2 flex items-center justify-between gap-2'>
      <div className="flex gap-4 items-center">
      <Image src={propertyData.photoURL} width={40} height={40} alt='' className='w-12 h-12 border border-purple rounded-lg'
      />
<div className="flex flex-col gap-1">
    <p className="text-xs">{propertyData.offerTitle}</p>
    {propertyData.listingOfferType === 'rent' ? <p className="text-sm text-green-400">{propertyData.price} $ / month</p> : <p className="text-sm text-green-400">{propertyData.price} $</p>}
</div>
      </div>
      <p> {propertyData.listingOfferType === 'rent' ? <p className="text-sm font-bold text-green-400">Rented</p> : <p className="text-sm font-bold text-green-400">Sold</p>}</p>
    </div>
  )
}

export default SucceededItem