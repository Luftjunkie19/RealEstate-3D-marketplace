import { useParticipant } from '@videosdk.live/react-sdk';
import React, { useEffect, useMemo, useRef } from 'react'
import { FaCamera, FaMicrophone, FaPhone } from 'react-icons/fa6';
import ReactPlayer from "react-player";
import { PiCameraSlashFill } from "react-icons/pi";


type Props = {participantId:any, key:any}

function ParticipantView({participantId,key}: Props) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName, participant } =
    useParticipant(participantId);

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
  
        <div className=" max-w-xs h-56 w-full bg-darkGray p-2 rounded-lg flex flex-col gap-2">
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
      ) : <PiCameraSlashFill className='text-5xl w-full h-full text-purple'/>}
        <p>{displayName}</p>
      
        </div>
   


    </div>
  );

}

export default ParticipantView