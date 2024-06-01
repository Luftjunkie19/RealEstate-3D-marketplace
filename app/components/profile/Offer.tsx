import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaBath } from 'react-icons/fa'
import { FaBed, FaDeleteLeft, FaPencil, FaTrashCan } from 'react-icons/fa6'
import { GiHouseKeys } from 'react-icons/gi'
import { MdSell } from 'react-icons/md'
import { supabase } from '@/utils/supabase/client'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/utils/hooks/useAuthContext'
import { useRouter } from 'next/navigation'
import ModalDialog from './ModalDialog'
import { DialogClose } from '@/components/ui/dialog'


type Props = {photoURL:string, listedBy:string, offerTitle:string, bathRooms:boolean, bedRooms:boolean, isForRent:boolean, price:number, id:string, squareMetrage:number}

function Offer({photoURL, offerTitle,listedBy, bathRooms, bedRooms, isForRent, price, id, squareMetrage}: Props) {

  const {user}=useAuthContext();
  const router = useRouter();

  const deleteOffer=async ()=>{
    await supabase.from('listings').delete().eq('listed_by', listedBy);
    toast.success('Successfully removed', {className:'bg-darkGray border border-purple'})
  }


  return (
    <div className='max-w-2xl w-full bg-darkGray rounded-lg p-4 flex gap-4 relative top-0 left-0'>
     
<Image src={photoURL} alt='' width={64} height={64} className='w-16 h-16 rounded-lg object-cover border border-purple'/>
<Link href={`/estate/${id}`} className="flex flex-col gap-1">
    <p className='text-white font-semibold'>{offerTitle}</p>
    {isForRent ?   <p className='text-green-500 font-bold'>{new Intl.NumberFormat('pl', {currency:'USD'}).format(price)} $ / month</p> :   <p className=' text-green-500 font-bold'>{new Intl.NumberFormat('en', {currency:'USD'}).format(price)} $</p>}
    <div className="flex gap-2 flex-wrap">
        <div className='px-2 py-1 flex gap-2 items-center border border-bgColor rounded-full'>
            <FaBath className='text-purple sm:tex-xs lg:text-base'/>
                        <p className='text-white'>{bathRooms}</p>
        </div>
        <div className='px-2 py-1 flex gap-2 items-center border border-bgColor rounded-full'>
            <FaBed className='text-purple sm:tex-xs lg:text-base'/>
                        <p className='text-white'>{bedRooms}</p>
        </div>
        {!isForRent ? <div className="py-2 px-3 flex gap-1 border text-white border-bgColor items-center rounded-full">
                  <MdSell className='text-purple sm:tex-xs lg:text-base' />
                  <p className="text-sm">Sale</p>
              </div> : <div className="py-2 px-4 border text-white border-bgColor flex gap-1 items-center rounded-full">
                  <GiHouseKeys className='text-purple sm:tex-xs lg:text-base' />
                  <p className="text-sm">Rent</p>
              </div>}
    </div>
</Link>
{user && listedBy === user.id && 
<div className="absolute top-0 p-2 right-0 flex gap-4">
  <button onClick={()=>router.push(`/update-listing/${id}`)}><FaPencil className='text-info lg:text-xl'/></button>
  <ModalDialog footerContent={<>
    <DialogClose className=' bg-blue-400 p-2 rounded-xl flex gap-2 items-center text-white'>Keep</DialogClose>
  <DialogClose onClick={deleteOffer} className='bg-red-500 p-2 rounded-xl flex gap-2 items-center text-white'>Remove <FaTrashCan/></DialogClose>
  </>} dialogDescription='Description' dialogContent={<p className="text-white">Have you sold or successfully rented your Real Estate ?</p>} dialogTitle='Were you successfull ?' buttonTitle={<FaTrashCan className='text-red-500 md:text-xl'/>}/> 

</div>
}

    </div>
  
  )
}

export default Offer