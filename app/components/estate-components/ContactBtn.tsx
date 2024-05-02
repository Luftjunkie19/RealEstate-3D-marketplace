'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import React from 'react'
import { FaMessage } from 'react-icons/fa6';

type Props = {data:any[], id:string }

function ContactBtn({data, id}: Props) {

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



       window.location.href=`/channel/${roomId}`;
    }

  return (
    <button onClick={createTokenAndRedirect} className='flex gap-2 items-center w-fit bg-purple p-2 rounded-lg'>
    <FaMessage className='text-white'/>
    <p className='text-white font-semibold'>Contact</p>
  </button>
  )

}

export default ContactBtn