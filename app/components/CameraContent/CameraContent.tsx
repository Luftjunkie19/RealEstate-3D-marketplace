/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { RiCameraOffFill } from "react-icons/ri";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { Constants, createCameraVideoTrack, createMicrophoneAudioTrack, MicrophoneDeviceInfo, useMediaDevice, useMeeting } from '@videosdk.live/react-sdk';
import React, {  useEffect, useRef, useState } from 'react'
import ParticipantView from '../camera/ParticipantView';
import { FaCamera, FaMicrophone, FaPhone, FaRegMessage } from 'react-icons/fa6';
import toast from "react-hot-toast";
import { TbMessageCircleOff } from "react-icons/tb";
import { MdCallEnd } from "react-icons/md";
import cameraImg from '@/assets/camera-off.png'
import { TbMessageCircle2 } from "react-icons/tb";
import micImg from '@/assets/images.jpeg'

type Props = {meetingID: string}
import {FadeLoader} from 'react-spinners';
import ChatDrawer from "../ChatDrawer";
import ReactPlayer from "react-player";
import useMediaStream from "@/lib/getDevices";
import Image from "next/image";

export default function CameraContent({meetingID}: Props) {
    const [joined, setJoined] = useState<string | null>(null);
    const [showChat, setShowChat]=useState<boolean>(true);
    const [micMuted, setMicMuted]=useState<boolean>(true);
    const [showCamera, setShowCamera]=useState<boolean>(true);
    const {getVideoTrack, getAudioTrack}=useMediaStream();
    //Devices Array
    const [accessedMics, setAccessedMics]=useState<any[]>([]);
    const [accessibleCams, setAccessibleCams]=useState<any[]>([]);
    const [accessedSpeakers, setAccessedSpeakers]=useState<any[]>([]);
    
    
    //Refs to camera and mic
    const [displayCamera, setDisplayCamera]=useState<MediaStream | null>(null);
    const micRef=useRef<HTMLAudioElement>(null);


    const toggleTestMic=()=>{
      if(micRef.current){
        micRef.current.pause();

      }
    }
    

  const {checkPermissions, getCameras, getMicrophones, requestPermission, getPlaybackDevices}=useMediaDevice({onDeviceChanged(devices) {
  const loadedDevices= devices.then((device)=>device);
  console.log(loadedDevices);
  },});

  const requestMissingPermissions= async ()=>{
    const permissions = await checkPermissions();


    if(!permissions.get(Constants.permission.AUDIO)){
      await requestPermission(Constants.permission.AUDIO);
    }

    if(!permissions.get(Constants.permission.VIDEO)){
     await requestPermission(Constants.permission.VIDEO); 
    }

    if(!permissions.get(Constants.permission.AUDIO_AND_VIDEO)){
       await requestPermission(Constants.permission.AUDIO_AND_VIDEO);
    }

  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMediaDevices = async () => {
    try {
      let webcams = await getCameras();

     
        setAccessibleCams(webcams);

       const accessCamera = await getVideoTrack({webcamId:webcams[0].deviceId as string, encoderConfig: "h540p_w960p" });
     if(accessCamera){
      setDisplayCamera(accessCamera);
     }else{
      setDisplayCamera(null);
      }
     
      

      let mics = await getMicrophones();

        setAccessedMics(mics);
        
        if(micRef.current){

          const accessMic = await getAudioTrack({micId:mics[0].deviceId as string });
          if(accessMic && joined !== 'JOINED'){
            micRef.current.srcObject=accessMic;
            micRef.current
            .play()
            .catch((error) =>
              console.error("videoElem.current.play() failed", error)
            );
          }else{
            micRef.current.srcObject=null;
          }
        }
        
      

      let speakers = await getPlaybackDevices();

      if(speakers.length > 0){
setAccessedSpeakers(speakers);
      }
    } catch (err) {
      console.log("Error in getting audio or video devices", err);
    }
  };


 
  useEffect(()=>{
    requestMissingPermissions();
  },[requestMissingPermissions]);

  useEffect(()=>{
    getMediaDevices();
  }, [getMediaDevices])


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

    const toggleCamera= ()=>{
      setShowCamera(!showCamera)
    }
  

    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

    const toggleMicHandler = () => {
      toggleMic();
            
    }
    const toggleWebcamHandler = () => {
      toggleWebcam();
    }

    const leaveConference= ()=>{
      if(participants.size === 1){
        end();
        window.location.href='/';
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
                  <button onClick={toggleWebcamHandler} className='text-white bg-purple p-3 rounded-full'>
                   {localWebcamOn ? <RiCameraOffFill/> : <FaCamera/>}  
                  </button>
                  <button onClick={leaveConference} className='text-white p-3 rounded-full bg-red-500'>
                    <FaPhone/>
                  </button>
                  <button onClick={toggleMicHandler} className='text-white bg-purple p-3 rounded-full'>
                  { !localMicOn ?  <FaMicrophone/> : <FaMicrophoneAltSlash/>}
                  </button>
                  <button onClick={toggleShowChat} className="text-white bg-purple p-3 rounded-full">
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
  {!micMuted && showCamera && joined !== "JOINED" && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-darkGray/60">
   <FaMicrophoneAltSlash className='text-purple text-5xl'/>
    </div>}
 {displayCamera && showCamera && joined !== "JOINED" && <ReactPlayer url={displayCamera as MediaStream} playing muted controls={false} height={'100%'} width={'100%'} playsinline onError={(err) => {
            console.log(err, "participant video error");
          }} />}
  {!displayCamera || !showCamera && joined !== "JOINED" && <div className="w-full h-full rounded-lg bg-darkGray p-2">
    <Image width={256} height={256} src={cameraImg} alt="" className="w-full h-full"/>
    </div>}
<audio  playsInline muted={micMuted} ref={micRef}></audio>
</div>


<div className='flex self-center max-w-sm w-full my-4 p-2 rounded-lg mx-auto m-0 bg-darkGray gap-6 justify-center items-center sticky top-0 left-0'>
                  <button onClick={toggleCamera} className={`text-white ${displayCamera ? 'bg-purple' : 'bg-red-500'} p-3 rounded-full`}>
                   {displayCamera && showCamera ? <RiCameraOffFill/> : <FaCamera/>}  
                  </button>
                  <button onClick={toggleTestMic} className={`text-white bg-purple p-3 rounded-full ${micMuted ? 'bg-purple' : 'bg-red-500'}`}>
                  { !micMuted ?  <FaMicrophone/> : <FaMicrophoneAltSlash/>}
                  </button>             
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

