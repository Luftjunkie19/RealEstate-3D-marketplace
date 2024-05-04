/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
'use client';

import React, { useEffect, useRef, useState } from "react";

import CameraContent from "@/app/components/CameraContent/CameraContent";
import VideoProvider from "@/utils/contexts/VideoProvider";
import { useAuthContext } from "@/utils/hooks/useAuthContext";
import { CameraDeviceInfo, Constants, MicrophoneDeviceInfo, useMediaDevice } from "@videosdk.live/react-sdk";
import { PlaybackDeviceInfo } from "@videosdk.live/react-sdk/dist/types/deviceInfo";
import useMediaStream from "@/lib/getDevices";

export default function Page({ params }: { params: { channelId: string } }) {
   
  const {user}=useAuthContext();
  const channelName=params.channelId;


  const {getVideoTrack, getAudioTrack}=useMediaStream();
    //Selected devices
    const [selectedMic, setSelectedMic]=useState<MicrophoneDeviceInfo | null>(null);
    const [selectedCamera, setSelectedCamera]=useState<CameraDeviceInfo | null>(null);
    const [selectedPlayback, setSelectedSpeaker]=useState<PlaybackDeviceInfo | null>(null);
    
    //Get tracks
    const [audioTrack, setAudioTrack]=useState<MediaStream | undefined>(undefined);
    const [videoTrack, setVideoTrack]=useState<MediaStream | undefined>(undefined);


    //Toggle Mic and Camera
    const [micEnabled, setMicEnabled]=useState<boolean>(false);
    const [cameraEnabled, setCameraEnabled]=useState<boolean>(false);

    const loadAudioTrack= async ()=>{
      if(selectedMic && micEnabled){
        const audioTrack = await getAudioTrack({micId:selectedMic.deviceId});
      setAudioTrack(audioTrack as MediaStream);
      }else{
        setAudioTrack(undefined);
      }
    }

    const loadVideoTrack=async()=>{
      if(selectedCamera && cameraEnabled){
        const videoTrack = await getVideoTrack({webcamId:selectedCamera.deviceId});
        setVideoTrack(videoTrack as MediaStream);
      }else{
        setVideoTrack(undefined);
      }
    }

    //Devices Array
    const [accessedMics, setAccessedMics]=useState<MicrophoneDeviceInfo[]>([]);
    const [accessibleCams, setAccessibleCams]=useState<CameraDeviceInfo[]>([]);
    const [accessedSpeakers, setAccessedSpeakers]=useState<PlaybackDeviceInfo[]>([]);
 

    

  const {checkPermissions, getCameras, getMicrophones, requestPermission, getPlaybackDevices}=useMediaDevice({onDeviceChanged(devices) {
  const loadedDevices= devices.then((device)=>device);
  },});

  const requestMissingPermissions= async ()=>{
    try {
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
    } catch (error) {
      console.log(error);
    }



  }

  const loadAccesibleDevices=async()=>{
    const cameras= await getCameras();
    const microphones= await getMicrophones();
    const playback= await getPlaybackDevices();

    setAccessedMics(microphones);
    setAccessibleCams(cameras);
    setAccessedSpeakers(playback);

    if(cameras.length > 0) { setSelectedCamera(cameras[0]);}
    if(microphones.length > 0) { setSelectedMic(microphones[0]);}

    if(playback.length > 0) { setSelectedSpeaker(playback[0]);}

  }

 
  useEffect(()=>{
    loadAccesibleDevices();
  }, [loadAccesibleDevices]);
 

  useEffect(()=>{
    requestMissingPermissions();
  },[requestMissingPermissions]);

  useEffect(()=>{
    loadVideoTrack();
  },[loadVideoTrack])


  useEffect(()=>{
    loadAudioTrack();
  }, [loadAudioTrack])

 
    return (
         <VideoProvider micEnabled={micEnabled} cameraEnabled={cameraEnabled} customVideo={videoTrack} customAudio={audioTrack} metaData={user?.user_metadata as any} userID={user && user.id as any} path={channelName} username={user && user.user_metadata.full_name}>
           <CameraContent selectSpeakers={setSelectedSpeaker} selectedSpeakers={selectedPlayback ? selectedPlayback.deviceId : null } selectCam={setSelectedCamera} selectMic={setSelectedMic} selectedMic={selectedMic ? selectedMic.deviceId : null} selectedCam={selectedCamera ? selectedCamera.deviceId : null} enabledCam={cameraEnabled} enabledMic={micEnabled} setEnabledCamera={setCameraEnabled} setEnabledMic={setMicEnabled} selectedAudioTrack={audioTrack} selectedCameraTrack={videoTrack} accessCams={accessibleCams} accessMics={accessedMics} accessSpeakers={accessedSpeakers}  meetingID={channelName}/>
        </VideoProvider>
    );
}
