/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { RiCameraOffFill } from "react-icons/ri";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { CameraDeviceInfo, Constants, createCameraVideoTrack, createMicrophoneAudioTrack, MicrophoneDeviceInfo, useMediaDevice, useMeeting } from '@videosdk.live/react-sdk';
import React, {  useEffect, useRef, useState } from 'react'
import ParticipantView from '../camera/ParticipantView';
import { FaCamera, FaMicrophone, FaPhone, FaRegMessage, FaSpeakerDeck } from 'react-icons/fa6';
import toast from "react-hot-toast";
import { TbMessageCircleOff } from "react-icons/tb";
import { MdCallEnd } from "react-icons/md";
import cameraImg from '@/assets/camera-off.png'
import { TbMessageCircle2 } from "react-icons/tb";
import micImg from '@/assets/images.jpeg'

type Props = {
  meetingID: string, 
  accessMics: MicrophoneDeviceInfo[],
  accessSpeakers:PlaybackDeviceInfo[],
  accessCams: CameraDeviceInfo[],
  selectedCameraTrack:MediaStream | undefined,
selectedAudioTrack:MediaStream | undefined,
setEnabledMic: React.Dispatch<React.SetStateAction<boolean>>,
setEnabledCamera:React.Dispatch<React.SetStateAction<boolean>>,
enabledMic:boolean,
enabledCam:boolean, 
selectedMic: string | null,
selectedCam:string | null,
selectedSpeakers:string | null,
selectCam:React.Dispatch<React.SetStateAction<CameraDeviceInfo | null>>,
selectMic:React.Dispatch<React.SetStateAction<MicrophoneDeviceInfo | null>>,
selectSpeakers: React.Dispatch<React.SetStateAction<PlaybackDeviceInfo | null>>,
}
import {FadeLoader} from 'react-spinners';
import ChatDrawer from "../ChatDrawer";
import ReactPlayer from "react-player";
import Image from "next/image";
import SelectionBar from "./items/SelectionBar";
import SelectListItem from "./items/SelectItem";
import { PlaybackDeviceInfo } from "@videosdk.live/react-sdk/dist/types/deviceInfo";
import { useRouter } from "next/navigation";
;

export default function CameraContent({meetingID, selectMic, selectCam, selectedSpeakers, selectSpeakers, selectedCam, selectedMic,  accessCams, accessSpeakers, accessMics, selectedAudioTrack, selectedCameraTrack, setEnabledCamera, setEnabledMic, enabledCam, enabledMic}: Props) {
  //Manage showing screen
    const [joined, setJoined] = useState<string | null>(null);
    const [showChat, setShowChat]=useState<boolean>(true);
    const router= useRouter();
  
    const { join, participants, toggleMic, toggleWebcam, leave, localMicOn, localWebcamOn, end, meeting
     } = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      onConnetionClose() {
        setJoined('CLOSED');
      },
      onParticipantJoined(participant) {
        toast(`${participant.displayName} joined the Conference`, {
          position:'bottom-right',
          className:" border-2 border-purple bg-darkGray"
        })
      },
      onChatMessage(messageData) {
      
          const { senderId, senderName, message } = messageData;
      
          console.log(messageData.text, message);
          
          const messageText = JSON.parse(messageData.text).message!;
      
        
        
        toast(`${senderName}: ${messageText}`, {className:" border-2 border-purple bg-darkGray", position:'top-right'})
      },
      onParticipantLeft(participant) {
        
      },
     
    });

  

    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

    const toggleMicHandler = () => {
      toggleMic();
      setEnabledMic(localMicOn);
            
    }
    const toggleWebcamHandler = () => {
      toggleWebcam();
      setEnabledCamera(localWebcamOn);
    }

    const leaveConference= ()=>{
      if(participants.size === 1){
        end();
        router.push('/');
      }
      leave();
      setJoined(null);
    }

    const sendMessage= (formData:FormData)=>{
      let messageText= formData.get('message') as string;
      console.log(messageText);
      if(messageText.length > 0){
meeting.sendChatMessage(JSON.stringify({message:messageText}));

      }

    }

    const toggleShowChat=()=>{
      setShowChat(!showChat);
    }

  return (
    <main className="w-screen h-screen ">
                {joined === "JOINED" ? (<>
                <div className={`w-screen sm:flex lg:justify-between ${showChat && 'grid-flow-row xl:grid  xl:grid-cols-12'}`}>
                  <div className={`p-4 w-full flex flex-col ${showChat && 'lg:col-span-6 xl:col-span-9'} gap-6`}>
                <div className='flex justify-around mx-auto m-0 max-w-2xl items-center gap-6 flex-wrap p-2'>
                        {participants && participants.size > 0 && [...participants.keys()].map((participantId) => (
                            <ParticipantView
                                participantId={participantId}
                                key={participantId}
                            />
                        ))}
                    </div>
                    <div className='flex self-center max-w-sm w-full my-4 p-2 rounded-lg mx-auto m-0 bg-darkGray gap-6 justify-center items-center sticky top-0 left-0'>
                  <button onClick={toggleWebcamHandler} className={`text-white bg-purple p-3 rounded-full ${!localWebcamOn ? 'bg-purple' : 'bg-red-500'}`}>
                   {localWebcamOn ? <RiCameraOffFill/> : <FaCamera/>}  
                  </button>
                  <button onClick={leaveConference} className='text-white p-3 rounded-full bg-red-500'>
                    <FaPhone/>
                  </button>
                  <button onClick={toggleMicHandler} className={`text-white p-3 rounded-full ${!localMicOn ? 'bg-purple' : 'bg-red-500'}`}>
                  { !localMicOn ?  <FaMicrophone/> : <FaMicrophoneAltSlash/>}
                  </button>
                  <button onClick={toggleShowChat} className={`text-white ${!showChat ? 'bg-purple' : 'bg-red-500'}  p-3 rounded-full`}>
                    {!showChat ? <TbMessageCircle2/> : <TbMessageCircleOff/>}
                  </button>
                  </div>
                  </div>

<div className={`sm:hidden relative top-0 left-0 transition-all $ ${showChat ? 'lg:flex translate-x-0 opacity-100' : 'translate-x-full opacity-0'} flex-col max-w-xs lg:col-span-6 xl:col-span-3 w-full gap-4 bg-darkGray h-screen rounded-l-lg`}>
  <p className="text-lg justify-center p-2 text-white font-semibold flex gap-4 items-center w-full border-bgColor border-b-2">Chat <FaRegMessage className="text-xl text-purple"/></p>
 <div className=" h-3/4 overflow-y-auto px-2 flex flex-col gap-2">
  {meeting.messages.map((message, i)=> (<div key={i} className=" bg-bgColor text-white p-2 rounded-lg">
    <p>{message.senderName}: {JSON.parse(message.text).message}</p>
  </div>))}
 </div>
  <form action={sendMessage} className="flex items-center justify-around sticky bottom-0 left-0 gap-2 w-full bg-bgColor p-2 ">
<textarea name="message" className="p-1 outline-none h-12 border-0 resize-none max-w-56 rounded-lg text-white"/>
<button className="bg-purple h-fit p-2 rounded-lg text-white">Send</button>
  </form>
</div>

                </div>
<ChatDrawer shownChat={showChat} closeChat={()=>setShowChat(false)} content={(<>
 <div className=" h-3/4 overflow-y-auto px-2 flex flex-col gap-2">
  {meeting.messages.map((message, i)=> (<div key={i} className=" bg-bgColor text-white p-2 rounded-lg">
    <p>{message.senderName}: {JSON.parse(message.text).message}</p>
  </div>))}
 </div>
  <form action={sendMessage} className="flex items-center justify-around sticky bottom-0 left-0 gap-2 w-full bg-bgColor p-2 ">
<textarea name="message" className="p-1 outline-none h-12 border-0 resize-none max-w-56 rounded-lg text-white"/>
<button className="bg-purple h-fit p-2 rounded-lg text-white">Send</button>
  </form>
</>)}/>         
                </>
                ) : joined === "JOINING" ? (<div className="flex flex-col my-12 gap-4 items-center">
                  <FadeLoader color="#703BF7"  />
                  <p className="text-white text-lg">Joining the meeting...</p>
                </div>
                ) : joined === "ERROR" ? (
                    <p>Error joining the meeting. Please try again later.</p>
                ) : (
                  <div className="mx-auto my-12 flex gap-8 items-center sm:flex-col lg:flex-row justify-around">

<div className="max-w-xl flex flex-col gap-4">

  
  
<div className="max-w-sm relative top-0 left-0 max-h-64 w-full h-full">
  {!selectedAudioTrack && enabledMic &&  joined !== "JOINED" && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-darkGray/60">
   
   <FaMicrophoneAltSlash className='text-purple text-5xl'/>
    </div>}
  { selectedCameraTrack && enabledCam && joined !== "JOINED" ? <ReactPlayer playing playsinline url={selectedCameraTrack} width={'100%'} height={'100%'}/> : <div className="w-full h-full rounded-lg bg-darkGray p-2">
    <Image width={256} height={256} src={cameraImg} alt="" className="w-full h-full"/>
    </div>}
</div>


<div className='flex self-center max-w-sm w-full my-4 p-2 rounded-lg mx-auto m-0 bg-darkGray gap-6 justify-center items-center sticky top-0 left-0'>
                  <button onClick={()=>setEnabledCamera(!enabledCam)}  className={`text-white ${enabledCam ? 'bg-purple' : 'bg-red-500'} p-3 rounded-full`}>
                    <FaCamera/>  
                  </button>
                  <button onClick={()=>setEnabledMic(!enabledMic)} className={`text-white bg-purple p-3 rounded-full ${ enabledMic ? 'bg-purple' : 'bg-red-500'}`}>
                    <FaMicrophone/> 
                  </button>             
                  </div>


  <div className="flex gap-4 p-2">
<SelectionBar selectedOption={selectedMic as string} setChange={selectMic} placeholder={<p className="text-white flex gap-1 items-center">Mics <FaMicrophone/> </p>}>
  {accessMics.length > 0 && accessMics.map((item)=>(<SelectListItem key={item.deviceId} value={item} label={item.deviceId}/>))}
</SelectionBar>

<SelectionBar selectedOption={selectedCam as string} setChange={selectCam}  placeholder={<p className="text-white flex gap-1 items-center">Cams <FaCamera/> </p>}>
  {accessCams.length > 0 && accessCams.map((item)=>(<SelectListItem key={item.deviceId} value={item} label={item.deviceId}/>))}
</SelectionBar>

<SelectionBar selectedOption={selectedSpeakers as string} setChange={selectSpeakers}  placeholder={<p className="text-white flex gap-1 items-center">Spks <FaSpeakerDeck/> </p>}>
  {accessSpeakers.length > 0 && accessSpeakers.map((item)=>(<SelectListItem key={item.deviceId} value={item} label={item.deviceId}/>))}
</SelectionBar>

    
  </div>
</div>
                    
<div className="flex gap-6 flex-col items-center">
<MdMeetingRoom className="text-6xl text-purple"/>
                    <p className="text-white text-lg">MeetingId: <span className="text-xl font-bold">{meetingID}</span></p>
                    <button className="text-white p-2 rounded-lg bg-purple" onClick={joinMeeting}>Join the meeting</button>
</div>   
                  </div>
                )}

                {joined === "CLOSED" && <div className="mx-auto m-0 flex flex-col items-center gap-6">
                  <MdCallEnd className=" text-3xl"/>
                  <p className="text-white text-lg">Meeting has ended up.</p>
                  </div>}



             
            </main>
  )
}

