'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import { IoCall } from 'react-icons/io5';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';

type Props = {data:any[], id:string }

function ContactBtn({data, id}: Props) {
const router=useRouter();
const {user:userData}=useAuthContext();

    const createTokenAndRedirect= async ()=>{
        const fetchEndPoint= await fetch('/api/videoChat/getVideoChat', {
        method:'POST',
        body:JSON.stringify({participantId: userData!.id, roomId:`${data![0].listed_by}#${userData!.id}_${id}` }),
        headers:{
          'Content-Type':'application/json',
        }
        });

        const token = await fetchEndPoint.json();

        const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmYzYyMzRiYi0zYzA1LTQyNjAtOGRmYS01NTkxMDAxMGM4ZDgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDY0MjU5MiwiZXhwIjoxODcyNDMwNTkyfQ.uWjFyMNr2MOKWg2nXMC-BdCw_Dv3LW97wzD_spBUAyU`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId }: { roomId: string } = await res.json();
  
  await supabase.from('users').update({notifications:[{directedTo:data![0].listed_by, message:'A Conference to your listing has been created. Join and talk with the customer.', callCreatedAt:new Date().getTime(), roomId, hasRead:false}]}).eq('user_id', data![0].listed_by);

  await supabase.from('conferences').insert({allowed_to_join:[userData?.id, data[0].listed_by], room_id:roomId, listing_id:id});

router.push(`/channel/${roomId}`);
    }

  return (
    <button onClick={createTokenAndRedirect} className={`${data[0].listed_by !== userData?.id ? 'flex' : 'hidden'} gap-2 items-center w-fit bg-purple p-2 rounded-lg`}>
    <IoCall className='text-white'/>
    <p className='text-white font-semibold'>Contact</p>
  </button>
  )

}

export default ContactBtn