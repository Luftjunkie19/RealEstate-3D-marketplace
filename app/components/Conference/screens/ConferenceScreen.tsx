
'use client';
import { useMeeting, useParticipant, usePubSub } from '@videosdk.live/react-sdk';
import React, { useState } from 'react';
import ParticipantView from '../ConferenceTiles/ParticipantView';
import { FaCamera, FaMicrophoneAltSlash } from 'react-icons/fa';
import { PiChatCircleDotsBold, PiChatCircleFill, PiPhoneDisconnectLight, PiScreencast } from "react-icons/pi";
import { FaMicrophone } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from 'react-icons/hi2';
import ChatDrawer from '../ChatDrawer';
import toast from 'react-hot-toast';
import PresentationView from '../ConferenceTiles/PresentationView';
import SharedScreenParticipantView from '../ConferenceTiles/SharedScreenParticipantView';
import { supabase } from '@/utils/supabase/client';

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
  const {localMicOn, localWebcamOn, toggleMic, toggleWebcam, participants, leave, end, presenterId, toggleScreenShare, localScreenShareOn}=useMeeting({onParticipantJoined:(participant)=>{
    toast(`${participant.displayName} joined`);
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
       supabase.from('conferences').update({finished_at:new Date()}).eq('room_id', meetingID).then((res)=>console.log(res));

      end();
    }
  
    leave();
    leaveMeeting();

    
  }

  const manageScreenSharing=()=>{
    toggleScreenShare();
  }


  
 return  (<main className='h-screen overflow-y-hidden w-full grid grid-cols-12 gap-4'>
  <div className={`sm:col-span-full relative top-0 left-0 h-full ${showChat && 'lg:col-span-8 xl:col-span-9 3xl:col-span-10'}`}>
  {presenterId ? <div className={`w-full p-4 flex gap-6 flex-col h-[80vh]`}>
    <PresentationView presenterId={presenterId}/>
    <div className="flex max-w-5xl mx-auto m-0 w-full flex-wrap max-h-[28rem] h-full gap-2">
      {[...participants.keys()].map((participant)=>(<SharedScreenParticipantView participantId={participant} key={participant}/>))}
    </div>
    </div> : <div className="w-full p-4 flex flex-wrap gap-2 h-[80vh]">
{[...participants.keys()].map((participantId)=>(<ParticipantView openedChat={showChat} key={participantId} participantId={participantId}/>))}
  </div>}
 

<div className="bg-darkGray z-50 sticky bottom-0 left-1/2 -translate-x-1/2 mb-2 p-2 mx-auto m-0 rounded-full flex items-center gap-4 max-w-xs w-full justify-center">
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
<button onClick={manageScreenSharing} className={`${!localScreenShareOn ? 'bg-purple' : 'bg-red-500'} sm:hidden xl:block text-white p-2 rounded-full`}>
  <PiScreencast />
</button>
</div>
  </div>

<ChatDrawer shownChat={showChat} closeChat={closeChat} />
 </main>
  )
}

