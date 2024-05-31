import { useMeeting, useParticipant } from '@videosdk.live/react-sdk'
import React, { useEffect, useMemo, useRef } from 'react'
import ReactPlayer from 'react-player';

type Props = {presenterId:string}

function PresentationView({presenterId}: Props) {
    const audioPlayerRef= useRef<HTMLAudioElement>(null);
    const {localScreenShareOn, toggleScreenShare, enableScreenShare, disableScreenShare}=useMeeting();
    const {micOn, webcamOn, displayName, isActiveSpeaker, screenShareOn,  screenShareAudioStream, screenShareStream, isLocal}=useParticipant(presenterId);

    const mediaStream = useMemo(() => {
        if (screenShareOn && screenShareStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(screenShareStream.track);
          return mediaStream;
        }
      }, [screenShareStream, screenShareOn]);

    useEffect(()=>{
        if(!isLocal && screenShareOn && screenShareAudioStream){
            const media= new MediaStream();
            media.addTrack(screenShareAudioStream.track);
            if(audioPlayerRef.current){
                audioPlayerRef.current.srcObject=media;
                audioPlayerRef.current.play().catch((err)=>{
                    console.log(err);
                })
            }
        }else{
            if(audioPlayerRef.current){
            audioPlayerRef.current.srcObject=null;
            }
        }
    }, [isLocal, screenShareAudioStream, screenShareOn]);
    
  return (

        <div className="max-w-7xl w-full sm:max-h-80 3xl:max-h-[36rem] self-center">
            <ReactPlayer onError={(err)=>console.log(err)} height={'100%'} width={'100%'} pip={false} playsinline muted playing controls={false} url={mediaStream}/>
            <audio autoPlay playsInline controls={false} ref={audioPlayerRef}/>
        </div>

  )
}

export default PresentationView