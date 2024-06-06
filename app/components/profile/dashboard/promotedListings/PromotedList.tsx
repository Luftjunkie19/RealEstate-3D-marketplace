import React from 'react'
import PromotedListing from './PromotedListing'

type Props = {listings:any[]}

function PromotedList({listings}: Props) {
  return (
    <div className='w-full max-h-64 h-full rounded-xl'>
{listings.map((listing, i)=>(<PromotedListing isRent={listing.rent_offer} propertyPrice={listing.price} propertyName={listing.property_name} propertyId={listing.id} propertyImage={listing.images[0]} key={i}/>))}
    </div>
  )
}

export default PromotedList