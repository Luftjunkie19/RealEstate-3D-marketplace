import { useParticipant } from "@videosdk.live/react-sdk";
import Image from "next/image";
import { useEffect, useRef } from "react";
import DefaultImage from '@/assets/defaultAvatar.jpg'
import { FaMicrophoneSlash } from "react-icons/fa";
type Props = {participantId:any, openedChat:boolean}

function ParticipantView({participantId, openedChat}: Props) {
const {participant, isLocal, isActiveSpeaker, isMainParticipant, screenShareStream, screenShareOn, screenShareAudioStream,  webcamStream, micStream, micOn, webcamOn, displayName }=useParticipant(participantId);
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

return (<>
<div className={`h-fit w-full ${openedChat ? 'lg:max-w-44 xl:max-w-52 3xl:max-w-60 3xl:max-h-40 sm:max-w-32 sm:max-h-24 lg:max-h-40 ' : 'sm:max-w-32 lg:max-w-52 lg:max-h-64 xl:max-w-xs sm:max-h-32'} overflow-hidden relative top-0 left-0`}>
  {webcamOn ? <video autoPlay playsInline muted ref={webcamRef} controls={false} className={` w-full h-full rounded-lg ${isActiveSpeaker ? 'border-green-400 border-2' : 'border-purple border-2' }`}/> : 
  <Image src={(participant.metaData as any).picture ? (participant.metaData as any).picture : DefaultImage} className={`w-full ${openedChat ? 'sm:max-h-24 lg:max-h-40' : 'sm:max-h-32 lg:max-h-52'} h-full object-cover rounded-lg`} width={64} height={64} alt=""/>}
  {!micOn && <div className=" bg-bgColor/50 flex absolute top-0 left-0 w-full h-full justify-center items-center">
    <FaMicrophoneSlash className="text-red-500 text-3xl"/>
    </div>}
  <div className="absolute bottom-0 left-0 text-xs text-white font-semibold w-full h-6 rounded-b-lg bg-purple/40">
  <p className="p-1">{displayName}</p>
  </div>
 
</div>

  <audio ref={micRef} autoPlay muted={isLocal}/>
  </>);

}

export default ParticipantView