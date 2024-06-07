import { supabase } from '@/utils/supabase/client'
import React from 'react'
import toast from 'react-hot-toast';

type Props = {notification:any, userData:any, userId:string}

function ContactRequest({notification, userData, userId}: Props) {

    const ignoreRequest=async ()=>{
        const updatedNotification= {...notification, hasRead:true};
    
        const updatedIndex= userData.notifications.findIndex((item)=>item.sentBy === notification.sentBy && item.createdAt === notification.createdAt);

       userData.notifications[updatedIndex]=updatedNotification;


     await supabase.from('users').update({notifications:[...userData.notifications]}).eq('user_id', userId);
    }

    const acceptRequest= async ()=>{
        await ignoreRequest();

        const {data: acceptedUserData}=await supabase.from('users').select('*').eq('user_id', notification.sentBy).limit(1);
console.log(acceptedUserData, userData);
        if(acceptedUserData && !userData.friends.find((item)=> item.id === notification.sentBy)){
            await supabase.from('users').update({friends:[...userData.friends, {username:acceptedUserData[0].user_name, id:notification.sentBy, profileImage:acceptedUserData[0].profile_image}]}).eq('user_id', userId)
        }else{
            toast.error('This user is already in your contacts. Please click ignore button.', {
                position:'bottom-right'
            })
        }
    }

  return (
    <div className='bg-purple text-white p-2 rounded-xl flex gap-2 items-center'>
            <p>{notification.content.length > 60 ? `${notification.content.slice(0, 40)}...` :  notification.content}</p>

            <div className="flex gap-2 items-center">
                <button onClick={acceptRequest} className='bg-green-500 py-2 rounded-xl h-fit px-4'>Join</button>
                <button onClick={ignoreRequest} className='bg-red-500 px-4 py-2 rounded-xl h-fit'>Ignore</button>
            </div>
        </div>
  )
}

export default ContactRequest