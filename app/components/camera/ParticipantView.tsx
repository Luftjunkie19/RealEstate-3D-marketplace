import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useEffect, useMemo, useRef } from 'react'
import { FaCamera, FaCrown, FaMicrophone, FaPhone } from 'react-icons/fa6';
import ReactPlayer from "react-player";
import { PiCameraSlashFill } from "react-icons/pi";
import cameraOff from '@/assets/camera-off.png'
import Image from 'next/image';
import { FaMicrophoneAltSlash } from 'react-icons/fa';


type Props = {participantId:any, key:any}

function ParticipantView({participantId,key}: Props) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName, participant, isActiveSpeaker, isMainParticipant} =
    useParticipant(participantId);
const {meeting}=useMeeting();
  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);



  return (
  
    <div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
  
        <div className={`${isActiveSpeaker && 'border-2 border-purple'} sm:w-32 sm:h-32 md:w-48 md:h-48 lg:max-w-64 w-full xl:max-w-xs relative top-0 left-0 lg:max-h-64 h-full bg-darkGray p-2 rounded-lg flex flex-col gap-2`}>
        {!micOn && <div className='w-full h-full absolute top-0 left-0 flex bg-black/20 justify-center items-center'>
          <FaMicrophoneAltSlash className='text-purple text-5xl'/>
          </div>}
        {webcamOn ? (
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          width={'100%'}
          height={'100%'}
          url={videoStream}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      ) :(<>
     {participant.metaData && participant.metaData.avatar_url && <Image src={participant.metaData.avatar_url} className='sm:w-16 sm:h-16 md:w-60 rounded-2xl md:h-44 object-fill' alt='' width={256} height={192} />} 
      </>)}
        
        <div className="flex gap-6 items-center sm:hidden lg:flex">
        <p className='text-white font-semibold'>{displayName}</p>
          {isMainParticipant && <FaCrown className=' text-yellow-400'/>} 
          </div>
      
        </div>
   


    </div>
   

  );

}

export default ParticipantView