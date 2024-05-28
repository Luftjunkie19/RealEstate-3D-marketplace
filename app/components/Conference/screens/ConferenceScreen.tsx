
'use client';
import { useMeeting, useParticipant, usePubSub } from '@videosdk.live/react-sdk';
import React, { useState } from 'react';
import ParticipantView from '../ConferenceTiles/ParticipantView';
import { FaCamera, FaMicrophoneAltSlash } from 'react-icons/fa';
import { PiChatCircleDotsBold, PiChatCircleFill, PiPhoneDisconnectLight } from "react-icons/pi";
import { FaMicrophone } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from 'react-icons/hi2';
import ChatDrawer from '../ChatDrawer';

type Props = {
  meetingID: string,
  setEnabledMic: React.Dispatch<React.SetStateAction<boolean>>,
  setEnabledCamera: React.Dispatch<React.SetStateAction<boolean>>,
  enabledMic: boolean,
  enabledCam: boolean,
  leaveMeeting:()=> void,
  participantId:string,
}

export function ConferenceScreen({meetingID, setEnabledCamera, setEnabledMic, enabledCam, enabledMic, participantId, leaveMeeting}: Props) {
  const {localMicOn, localWebcamOn, toggleMic, toggleWebcam, participants, leave, end}=useMeeting({onParticipantJoined:(participant)=>{
    console.log("participant joined",participant);
  }});

  const [showChat, setShowChat]=useState(false);

  const closeChat=()=>{
    setShowChat(false);
  };

  const toggleChat=()=>{
    setShowChat(!showChat);
  }

  const router = useRouter();

  const manageMic=()=>{
    toggleMic();
    setEnabledMic(!enabledMic);
  }

  const manageWebCam=()=>{
    toggleWebcam();
    setEnabledCamera(!enabledCam);
  }

  const leaveM=()=>{
    if([...participants.keys()].length === 1){
      end();
    }
    
    leave();
    leaveMeeting();
    router.push('/');

    
  }


  
 return  (<main className='h-screen overflow-y-hidden w-full grid grid-cols-12'>
  <div className={`sm:col-span-full relative top-0 left-0 ${showChat && 'lg:col-span-8 xl:col-span-9 3xl:col-span-10'}`}>
  <div className="w-full p-4 flex gap-2 flex-wrap xl:h-[75vh]">
{[...participants.keys()].map((participantId)=>(<ParticipantView key={participantId} participantId={participantId}/>))}
  </div>

<div className="bg-darkGray sticky bottom-0 left-1/4 p-2 mx-auto m-0 rounded-full flex flex-wrap items-center gap-4 max-w-xs w-full justify-center">
  <button onClick={manageWebCam} className={`${!localWebcamOn ? 'bg-purple' : 'bg-red-500'} p-2 rounded-full`}>
   {!localWebcamOn ?  <HiMiniVideoCamera className='text-white text-lg'/> : <HiMiniVideoCameraSlash className='text-white text-lg'/>}
  </button>
  <button onClick={leaveM} className='bg-red-500 p-2 rounded-full'>
    <PiPhoneDisconnectLight className='text-white text-lg'/>
  </button>
  <button onClick={manageMic} className={`${!localMicOn ? 'bg-purple' : 'bg-red-500'} p-2 rounded-full`}>
   {!localMicOn ?  <FaMicrophone className='text-white text-lg'/> : <FaMicrophoneAltSlash className='text-white text-lg'/>}
  </button>
  <button onClick={toggleChat} className={`${!showChat ? 'bg-purple' : 'bg-red-500'} p-2 rounded-full`}>
<PiChatCircleFill className='text-white text-lg'/> 
  </button>
</div>
  </div>
<ChatDrawer shownChat={showChat} closeChat={closeChat} />
 </main>
  )
}

