import { useParticipant } from "@videosdk.live/react-sdk";
import Image from "next/image";
import { useEffect, useRef } from "react";
import DefaultImage from '@/assets/defaultAvatar.jpg'
import { FaMicrophoneSlash } from "react-icons/fa";
type Props = {participantId:any}

function ParticipantView({participantId}: Props) {
const {participant, isLocal, isActiveSpeaker, isMainParticipant, webcamStream, micStream, micOn, webcamOn, displayName }=useParticipant(participantId);
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
<div className="sm:max-w-28 sm:max-h-40 md:max-w-36 md:max-h-36 lg:max-w-xs lg:max-h-80 3xl:max-w-sm 3xl:max-h-96 h-fit w-fit overflow-hidden  relative top-0 left-0">
  {webcamOn ? <video width={'100%'} height={'100%'} autoPlay playsInline muted ref={webcamRef} controls={false} className={`w-full h-full rounded-lg border ${isActiveSpeaker ? 'border-green-400' : 'border-purple' }`}/> : 
  <Image src={(participant.metaData as any).picture ?? DefaultImage} className="w-full h-48 object-cover rounded-lg" width={64} height={64} alt=""/>}
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