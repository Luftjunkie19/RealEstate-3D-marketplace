'use client';
import React from 'react';
import Lottie from 'lottie-react';
type Props = {backToConference:()=>void}
import lottieExit from '@/assets/lottieExit.json'
import { FaBackward } from 'react-icons/fa6';
import { GiExitDoor } from 'react-icons/gi';
import { useRouter } from 'next/navigation';
import { useMeeting } from '@videosdk.live/react-sdk';

function LeftConferenceScreen({backToConference}: Props) {
  const router=useRouter();
  const {join}=useMeeting();
  const goToMain=()=>{
    router.push('/')
  }

  const goBack=()=>{
    backToConference();
    join();
  }

  return (
    <div className='h-screen w-full flex flex-col gap-2 justify-center items-center'>
      <p className='text-white font-bold text-2xl text-center'>You Left The Meeting</p>
      <Lottie className='max-w-xs w-full' animationData={lottieExit} loop/>
      <p className="text-sm text-white">You can leave by clicking this button or just wait.</p>
      <div className="flex gap-4 items-center">
      <button onClick={goToMain} className='bg-red-500 p-2 rounded-lg text-white flex gap-2 items-center max-w-64 w-full'>Leave <GiExitDoor/></button>
      </div>
    </div>
  )
}

export default LeftConferenceScreen