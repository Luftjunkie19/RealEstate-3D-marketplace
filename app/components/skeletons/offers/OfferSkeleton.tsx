import React from 'react'

type Props = {}

function OfferSkeleton({}: Props) {
  return (
    <div className='flex max-w-2xl w-full gap-2'>
        <div className="w-16 h-16 skeleton rounded-lg"></div>
       <div className="flex fap-2 flex-col">
        <div className="w-6 h-4 skeleton rounded-lg"></div>
        <div className="w-8 h-4 skeleton rounded-lg"></div>
        <div className="flex gap-4 items-center">
            <div className="w-5 h-3 skeleton rounded-full"></div>
            <div className="w-5 h-3 skeleton rounded-full"></div>
            <div className="w-7 h-3 skeleton rounded-full"></div>
        </div>
       </div>

        
    </div>
  )
}

export default OfferSkeleton