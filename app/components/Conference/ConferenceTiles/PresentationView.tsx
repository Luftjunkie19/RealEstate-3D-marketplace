import { useMeeting, useParticipant } from '@videosdk.live/react-sdk'
import React, { useEffect, useMemo, useRef } from 'react'

type Props = {presenterId:string}

function PresentationView({presenterId}: Props) {
    const audioPlayerRef= useRef<HTMLAudioElement>(null);
    const {localScreenShareOn, toggleScreenShare, enableScreenShare, disableScreenShare}=useMeeting();
    const {micOn, webcamOn, displayName, isActiveSpeaker, screenShareOn,  screenShareAudioStream, screenShareStream, isLocal}=useParticipant(presenterId);

    const mediaStream=useMemo(()=>{
        if(screenShareOn){
            const stream=new MediaStream();
            stream.addTrack(screenShareAudioStream.track);
            return stream;
        }
    },[screenShareAudioStream.track, screenShareOn]);

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
    <div>PresentationView</div>
  )
}

export default PresentationView