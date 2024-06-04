'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {data:any, sellerData:any}

function OwnerLink({data, sellerData}: Props) {
    const {user}=useAuthContext();
  return (
<Link className='flex gap-2 items-center' href={`${user && data[0].listed_by === user?.id ? '/profile' : `/profile/${data[0].listed_by}`}`}>
<Image src={sellerData[0].profile_image} alt='' width={32} height={32} className='rounded-full w-8 h-8'/>
<p className='text-white text-sm'>{sellerData[0].user_name}</p>
  </Link>
  )
}

export default OwnerLink