import { useParticipant } from '@videosdk.live/react-sdk';
import Image from 'next/image';
import DefaultImage from '@/assets/defaultAvatar.jpg'
import React, { useEffect, useRef } from 'react'
import { FaMicrophoneSlash } from 'react-icons/fa6';

type Props = {participantId:string}

function SharedScreenParticipantView({participantId}: Props) {
    const {participant, isLocal, isActiveSpeaker, webcamStream, micStream, micOn, webcamOn, displayName }=useParticipant(participantId);
    const micRef=useRef<HTMLAudioElement>(null);
    const webcamRef=useRef<HTMLVideoElement>(null);
    
    useEffect(()=>{
      if(micRef.current){
        if(micOn && micStream){
          const mediaStream= new MediaStream();
          mediaStream.addTrack(micStream.track);
    
          micRef.current.srcObject=mediaStream;
          micRef.current.play().catch(err=>console.log(err));
    
        }else{
          micRef.current.srcObject=null;
        }
      }
    },[micOn, micStream]);
    
    useEffect(()=>{
      if(webcamRef.current){
        if(webcamOn && webcamStream){
          const mediaStream= new MediaStream();
          mediaStream.addTrack(webcamStream.track);
    
          webcamRef.current.srcObject=mediaStream;
          webcamRef.current.play().catch(err=>console.log(err));
    
        }else{
          webcamRef.current.srcObject=null;
        }
      }
    },[ webcamOn, webcamStream]);

  return (
    <>
      <div className=" sm:max-w-40 3xl:max-w-60 w-full relative top-0 left-0 sm:max-h-32 ">
        {!micOn && <div className="absolute top-0 left-0 w-full h-full bg-darkGray/60 flex flex-col justify-center items-center">
          <FaMicrophoneSlash className='text-xl text-red-500'/>
          </div>}
      {webcamOn ? <video  width={'100%'} height={'100%'} autoPlay playsInline muted ref={webcamRef} controls={false} className={`w-full h-full rounded-lg border ${isActiveSpeaker ? 'border-green-400' : 'border-purple' }`}/> : 
  <Image src={(participant.metaData as any).picture ? (participant.metaData as any).picture : DefaultImage} className="h-fit w-full object-cover rounded-lg" width={64} height={64} alt=""/>}
      <div className="absolute bottom-0 left-0 text-xs text-white font-semibold w-full h-6 rounded-b-lg bg-purple/40">
  <p className="p-1">{displayName}</p>
  </div>
      </div>

      <audio ref={micRef} autoPlay muted={isLocal}/>
    </>
  )
}

export default SharedScreenParticipantView