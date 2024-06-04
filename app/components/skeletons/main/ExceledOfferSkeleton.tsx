import React from 'react'

type Props = {}

function ExceledSkeleton({}: Props) {
  return (
    <div className='flex flex-col gap-4 max-w-xs w-full'>
        <div className="skeleton w-full max-h-40 h-full"></div>
        <div className="skeleton max-w-40 w-full h-4"></div>
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-full h-4"></div>
    </div>
  )
}

export default ExceledSkeleton