import React from 'react'
import SucceededItem from './SucceededItem'

type Props = {listings:any[]}

export default function SucceededList({listings}: Props) {
  return (
    <div className='max-w-sm w-full max-h-64 h-full overflow-y-auto'>
        {listings.map((item, i)=><SucceededItem propertyData={item} key={i}/>)}
    </div>
  )
}