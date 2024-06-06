'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import { IoCall, IoChatbubble } from 'react-icons/io5';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import ModalDialog from '../profile/ModalDialog';
import { DialogClose } from '@/components/ui/dialog';
import { MdClose } from 'react-icons/md';
import {GiVideoConference} from 'react-icons/gi';
import toast from 'react-hot-toast';
type Props = {data:any[], id:string }

function ContactBtn({data, id}: Props) {
const router=useRouter();
const {user:userData}=useAuthContext();

    const createTokenAndRedirect= async ()=>{
        const fetchEndPoint= await fetch('/api/videoChat/getVideoChat', {
        method:'POST',
        body:JSON.stringify({participantId: (userData as User)?.id, roomId:`${data![0].listed_by}#${userData?.id}_${id}` }),
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
  
  await supabase.from('users').update({notifications:[{directedTo:data[0].listed_by, message:'A Conference to your listing has been created. Join and talk with the customer.', callCreatedAt:new Date().getTime(), roomId, hasRead:false}]}).eq('user_id', data![0].listed_by);

  await supabase.from('conferences').insert({allowed_to_join:[userData?.id, data[0].listed_by], room_id:roomId, listing_id:id});

router.push(`/channel/${roomId}`);
    }

    const createAChat= async ()=>{
      console.log(userData);
      if(userData){
const existingChatObject= await supabase.from('chats').select('*').in('users_allowed', [userData.id, data[0].listed_by]).eq('listing_id', id).limit(1);
if(!existingChatObject.data || existingChatObject.data.length > 0){
 const createdObj= await supabase.from('chats').insert({from_user_id:userData.id, to_user_id:data[0].listed_by, users_allowed:[userData.id, data[0].listed_by], messages:[], listing_id:id });
toast.success('Successfully created chat !');
console.log(createdObj);
}else{
  if(existingChatObject){
   console.log(existingChatObject);
  }
}
}
    }

  return (<>
  {data[0].listed_by !== userData?.id && 
   <ModalDialog buttonTitle={<div className="bg-purple p-2 rounded-xl text-white flex items-center gap-2">
   <IoCall className='text-white' />
   <p className='text-white font-semibold'>Contact</p>
 </div>} dialogTitle={'Choose a Contact Option:'} dialogDescription={''} dialogContent={<div className="flex gap-4 items-center text-white">
   <button onClick={createTokenAndRedirect} className={`${data[0].listed_by !== userData?.id ? 'flex' : 'hidden'} gap-2 items-center w-fit bg-purple p-2 rounded-lg`}>
Conference <GiVideoConference/>
</button>
<button onClick={createAChat} className={`${data[0].listed_by !== userData?.id ? 'flex' : 'hidden'} gap-2 items-center w-fit bg-purple p-2 rounded-lg`}>
Chat <IoChatbubble/>
</button>
 </div>} footerContent={<>
   <DialogClose className='bg-red-500 text-white p-2 rounded-xl flex items-center gap-2'>Close <MdClose /></DialogClose>
 </>} />}
  </>

  )

}

export default ContactBtn