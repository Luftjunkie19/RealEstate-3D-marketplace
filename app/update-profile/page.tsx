'use client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import DefaultImg from '@/assets/defaultAvatar.jpg'
import { FaImage } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



function UpdateProfilePage() {

    const {user}=useAuthContext();
    const router =useRouter();
    const [userProfile, setUserProfile]=useState(null);
    const [userImg, setUserImg]=useState<string | null>(null);

    const uploadUserData= useCallback(async ()=>{
        if(user){

        const {data, error} = await supabase.from('users').select('*').eq('email', user.email);

        if(data){
            setUserProfile(data[0]);
        }


        }
    }, [user])

    const selectProfileImg=(e:ChangeEvent<HTMLInputElement>)=>{


if(!e.target.files){
    toast.error('No Image has been picked');
    return;
}

const fileReader= new FileReader();

fileReader.onload=()=>{
    setUserImg((e.target.files as any)[0]);
}


    }

    useEffect(()=>{
uploadUserData();
    }, []);


    const updateProfile = async (formData:FormData)=>{
        const usernameField = formData.get('username');
        const userProfileImg= formData.get('userProfileImg');

        await supabase.from('users').update({user_name:usernameField, profile_image: userProfile && (userProfile as any).profile_image}).eq('email', user!.email);
        toast.success('Profile Updated');

        router.push('/');

    }

  return (
    <div className='w-screen h-screen'>     
       <form action={updateProfile} className=' bg-darkGray py-8 px-4 rounded-xl max-w-3xl mx-auto my-6 m-0 flex justify-around items-center'>
        <div className="flex flex-col gap-4 items-center">
        {userImg ? <Image src={userImg} className='w-36 h-36 rounded-full' width={96} height={96} alt='' /> : <Image  className='w-36 h-36 rounded-full' width={96} height={96} alt='' src={DefaultImg}/>}
        <input onChange={selectProfileImg} type="file" className="file-input file-input-bordered bg-purple w-full max-w-64" />

        </div>

<div  className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
    <p className='text-white'>Username:</p>
    <input name='username' onChange={(e)=>setUserProfile({...(userProfile as any), user_name:e.target.value })} value={userProfile as any && (userProfile as any).user_name} className='max-w-sm p-2 rounded-xl text-white'/>
    </div>
    <button className='bg-purple p-2 rounded-lg text-white'>Update Profile</button>
</div>
        
       </form>

    </div>
  )
}

export default UpdateProfilePage