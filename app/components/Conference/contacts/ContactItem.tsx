'use client';
import { supabase } from '@/utils/supabase/client'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { FaPaperPlane } from 'react-icons/fa6'

type Props = {contactData:any, roomId:string}

function ContactItem({contactData, roomId}: Props) {

    const inviteUser= async ()=>{
        const {data, error}= await supabase.from('users').select('*').eq('user_id', contactData.id).limit(1);
        const {data:conferenceData}= await supabase.from('conferences').select('*').eq('room_id', roomId).limit(1);
        try {
            if(data && conferenceData && conferenceData.length > 0 && data.length > 0){
                await supabase.from('conferences').update({allowed_to_join:[...conferenceData[0].allowed_to_join, contactData.id]}).eq('room_id', roomId);
                await supabase.from('users').update({notifications:[...data[0].notifications, {directedTo:contactData.id, message:'A Conference to your listing has been created. Join and talk with the customer.', callCreatedAt:new Date().getTime(), roomId:roomId, hasRead:false}]}).eq('use_id', contactData.id);
            toast.success('Successfully invited !');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went unsuccessfull....')
        }
    }


  return (
    <div className='p-4 rounded-full w-full flex items-center gap-2 justify-between'>
<div className="flex items-center gap-2">
    <Image src={contactData.profileImage} alt='' width={64} height={64} className='w-12 h-12 rounded-full'/>
    <p className="text-white font-semibold">{contactData.username}</p>
</div>

<button onClick={inviteUser} className="bg-purple p-2 text-white flex items-center gap-2 rounded-full">Invite <FaPaperPlane /></button>
    </div>
  )
}

export default ContactItem