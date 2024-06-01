'use client';
import React, { useEffect, useRef, useState } from 'react';
import cameraOff from '@/assets/camera-off.png';
import {
  CameraDeviceInfo,
  Constants,
  useMediaDevice,
  useMeeting,
} from '@videosdk.live/react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import useMediaStream from '@/lib/getDevices';
import { conferenceActions } from '@/utils/contexts/ConferenceActions';
import { MicrophoneDeviceInfo, PlaybackDeviceInfo } from '@videosdk.live/react-sdk/dist/types/deviceInfo';
import { FaMicrophone } from 'react-icons/fa';
import { FaCamera, FaMicrophoneSlash } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SelectionBar from '../items/SelectionBar';
import SelectListItem from '../items/SelectItem';
import { TbBuildingSkyscraper } from "react-icons/tb";


type Props = {
  setCamOn:(value:boolean)=>void,
  setMicOn:(value:boolean)=>void,
  setCustomAudioStream:(audioStream:MediaStream | undefined )=>void,
  setCustomVideoStream:(videoStream:MediaStream | undefined)=>void,
  camOn:boolean,
  micOn:boolean,
  meetingId: string,
  joinMeeting:()=>void,
}


function PreSetupScreen({ setCamOn, setMicOn, setCustomAudioStream, setCustomVideoStream, camOn, micOn, meetingId, joinMeeting}: Props) {
  const dispatch=useDispatch();
  const selectedMic=useSelector((state:any)=>state.conference.selectedMic);
  const selectedCamera=useSelector((state:any)=>state.conference.selectedCamera);
  const isCameraPermissionAllowed= useSelector((state:any)=>state.conference.isCameraPermissionAllowed);
  const isMicPermissionAllowed= useSelector((state:any)=>state.conference.isMicPermissionAllowed);
const {join}=useMeeting();
  const onDeviceChanged= async ()=>{
    getCameraDevices();
    getAudioDevices();
    getDefaultMediaTracks({mic:micRef.current, webcam:webCamRef.current});
  }



    const { checkPermissions, requestPermission, getCameras, getPlaybackDevices, getMicrophones } = useMediaDevice({onDeviceChanged});
    const {getVideoTrack, getAudioTrack}=useMediaStream();
    const [audioTrack, setAudioTrack]=useState<MediaStreamTrack | null>(null);
    const [videoTrack, setVideoTrack]=useState<MediaStreamTrack | null>(null);
    const [micDevices, setMicDevices]=useState<MicrophoneDeviceInfo[] | null>(null);
    const [webcamDevices, setWebcamDevices]=useState<CameraDeviceInfo[] | null>(null);
    const [speakersDevices, setSpeakersDevices]=useState<PlaybackDeviceInfo[] | null>(null);
    const videoTrackRef=useRef<any>(null);
    const videoPlayerRef=useRef<HTMLVideoElement>(null);
    const audioTrackRef=useRef<any>();
    const permissionAvailable=useRef<any>();
    const webCamRef=useRef<any>();
    const micRef=useRef<any>();

    const getDefaultMediaTracks= async ({mic, webcam}:{mic:boolean, webcam:boolean})=>{
      if(mic){
        const stream= await getAudioTrack({micId:selectedMic.id});
        setCustomAudioStream(stream as MediaStream);
        const audioTracks=stream?.getAudioTracks();
        const audioTrack= audioTracks?.length ? audioTracks[0] : null;
        setAudioTrack(audioTrack);
      }
      else{
        await requestPermission(Constants.permission.AUDIO);
      }

      if(webcam){
        const stream= await getVideoTrack({webcamId:selectedCamera.id, encoderConfig:'h540p_w960p'});
        setCustomVideoStream(stream as MediaStream);
        const videoTracks= stream?.getVideoTracks();
        const videoTrack = videoTracks?.length ? videoTracks[0] : null;
        setVideoTrack(videoTrack);
      }
    }

    const checkMediaPermissions = async () => {
        const checkPermission = await checkPermissions();
        const checkAudioPermission= checkPermission.get(Constants.permission.AUDIO);
        const checkVideoPermission= checkPermission.get(Constants.permission.VIDEO);

        dispatch(conferenceActions.setCameraPermission(checkVideoPermission));
        dispatch(conferenceActions.setMicPermission(checkAudioPermission));

        if(checkAudioPermission){
          setMicOn(true);
          getDefaultMediaTracks({mic:true, webcam:false});
        }else{
          await requestPermission(Constants.permission.AUDIO);
        }

      
        
        if(checkVideoPermission){
        getDefaultMediaTracks({mic:false, webcam:true});
        setCamOn(true);
        }else{
          await requestPermission(Constants.permission.VIDEO);
        }
      }

      const getCameraDevices= async ()=>{
        if(isCameraPermissionAllowed){
          let cameras= await getCameras();
          dispatch(conferenceActions.selectCamera({id:cameras[0]?.deviceId, label:cameras[0]?.label}));
          setWebcamDevices(cameras);
        }
      }

      const getAudioDevices= async ()=>{
        if(isMicPermissionAllowed){
          let mics= await getMicrophones();
          let speakers= await getPlaybackDevices();
  
          setMicDevices(mics);
          dispatch(conferenceActions.selectMic({id:mics[0].deviceId, label:mics[0].label}));
          setSpeakersDevices(speakers);
          dispatch(conferenceActions.selectSpeaker({id:speakers[0].deviceId, label:speakers[0].label}));
          
        }
      }

      const changeCam= async (deviceId:string)=>{
        if(camOn){
          const currentVideoTrack= videoTrackRef.current;
          if(currentVideoTrack){
            currentVideoTrack.stop();
          }

          const cameraObjects= await getCameras();
          const camera= cameraObjects.find((camera)=>camera.deviceId===deviceId);

          const stream= await getVideoTrack({webcamId:deviceId});
          setCustomVideoStream(stream as MediaStream);
          const videoTracks= stream?.getAudioTracks();
          const videoTrack= (videoTracks as MediaStreamTrack[])?.length > 0 ? (videoTracks as MediaStreamTrack[])[0] : null;
          setVideoTrack(videoTrack);
          dispatch(conferenceActions.selectCamera({label:camera?.label, id:camera?.deviceId}));


        }
      }

      const changeMic= async (deviceId:string)=>{
        if(micOn){
          const currentAudioTrack= audioTrackRef.current;
          if(currentAudioTrack){
            currentAudioTrack.stop();
          }
          const microphones= await getMicrophones();
          const mic= microphones.find((mic)=>mic.deviceId===deviceId);
          const stream= await getAudioTrack({micId:deviceId});
          setCustomAudioStream(stream as MediaStream);
          const audioTracks= stream?.getAudioTracks();
          const audioTrack= (audioTracks as MediaStreamTrack[])?.length > 0 ? (audioTracks as MediaStreamTrack[])[0] : null;
          setVideoTrack(audioTrack);


          dispatch(conferenceActions.selectCamera({label:mic?.label, id:mic?.deviceId}));
        }
      }

      const toggleMic= ()=>{
        const audioTrack= audioTrackRef.current;
        setMicOn(!micOn);

        if(micOn){
          if(audioTrack){
            audioTrack.stop();
            setAudioTrack(null);
            setCustomAudioStream(undefined);
          }else{
            getDefaultMediaTracks({mic:true, webcam:false});
          }
        }
      };

      const toggleCamera= ()=>{
        const videoTrack= videoTrackRef.current;
        setCamOn(!camOn);

        if(camOn){
          if(videoTrack){
            videoTrack.stop();
            setVideoTrack(null);
            setCustomVideoStream(undefined);

        }else{
          getDefaultMediaTracks({mic:false, webcam:true});
        }
      }
      }


      const startMuteListener= async ()=>{
        const currentAudioTrack= audioTrackRef.current;
        if(currentAudioTrack){
          if(currentAudioTrack.muted){
            currentAudioTrack.addEventListener('mute', ()=>{});
          }
        }
      }

useEffect(()=>{
  permissionAvailable.current={isCameraPermissionAllowed, isMicPermissionAllowed};
},[isCameraPermissionAllowed, isMicPermissionAllowed])


      useEffect(()=>{

        if(camOn){
          videoTrackRef.current=videoTrack;
        }

        let isPlaying= videoPlayerRef.current?.currentTime as number > 0 && !videoPlayerRef.current?.paused && !videoPlayerRef.current?.ended 

        if(videoTrack){
          const videoSrcObject= new MediaStream([videoTrack]);

          if(videoPlayerRef.current){
            videoPlayerRef.current.srcObject=videoSrcObject;
            if(videoPlayerRef.current.paused && !isPlaying){
              videoPlayerRef.current.play();
            }
          }else{
            if(videoPlayerRef.current){
              (videoPlayerRef.current as any).srcObject=null;
            }
          }
        }
      },[camOn, videoTrack]);

      useEffect(()=>{
        if(micOn){
          audioTrackRef.current=audioTrack;
          startMuteListener();
        }
      },[audioTrack, micOn])

      useEffect(()=>{
        webCamRef.current=camOn;
      },[camOn]);

      useEffect(()=>{
        micRef.current=micOn;
      },[micOn]);

      useEffect(()=>{
        checkMediaPermissions();
        return ()=>{};
      },[]);

      useEffect(()=>{
        getCameraDevices();
      },[isCameraPermissionAllowed]);

      useEffect(()=>{
        getAudioDevices();
      },[isMicPermissionAllowed]);

    return (
    <div className='w-full h-screen overflow-hidden'>
      <div className="flex sm:flex-col lg:flex-row items-center justify-around max-w-screen-3xl mx-auto m-0 gap-4 p-4">
        <div className="flex flex-col gap-4">
      <div className="sm:max-w-sm self-center overflow-hidden relative top-0 left-0 2xl:max-w-md w-full sm:max-h-[25rem] 2xl:max-h-[32rem]">
       {camOn ? <video autoPlay playsInline muted ref={videoPlayerRef} controls={false} className='w-full h-full rounded-lg border-2 border-purple'/> : <div className='w-full h-full rounded-lg flex items-center justify-center border-4 border-purple'>
        <Image src={cameraOff} height={64} width={64} className='sm:max-w-sm 2xl:max-w-md w-full h-full sm:max-h-[25rem] 2xl:max-h-[32rem]' alt=''/>
        </div>}
        {!micOn && <div className='absolute top-0 left-0 w-full h-full bg-purple/50 flex items-center justify-center'>
          <FaMicrophoneSlash className='text-red-500 text-4xl'/>          
          </div>}
        <div className="w-full h-12 p-2 absolute bottom-0 justify-center left-0 items-center bg-bgColor/65 z-50  flex gap-4">
<button onClick={toggleMic} className='bg-purple p-2 h-fit rounded-full'>
  <FaMicrophone className='text-white text-xl'/>
  </button>   
  <button onClick={toggleCamera} className='bg-purple p-2 h-fit rounded-full'>
  <FaCamera className='text-white text-xl'/>
  </button>      
      </div>    
  </div>
  <div className="flex gap-2 items-center">
        <SelectionBar setChange={changeMic} placeholder="Microphones" selectedOption={selectedMic.label}>
          {micDevices?.map((microphone)=>(<SelectListItem label={microphone.label} value={microphone.deviceId} key={microphone.deviceId} />))}
        </SelectionBar>
        <SelectionBar setChange={(value)=>console.log(value)} placeholder="Speakers" selectedOption={''}>
          {speakersDevices?.map((speaker)=>(<SelectListItem label={speaker.label}  value={speaker.deviceId} key={speaker.deviceId} />))}
        </SelectionBar>
        <SelectionBar setChange={changeCam} placeholder="Webcams" selectedOption={selectedCamera.label}>
          {webcamDevices?.map((webcam)=>(<SelectListItem label={webcam.label}  value={webcam.deviceId} key={webcam.deviceId} />))}
        </SelectionBar>
      </div>
        </div>

      <div className="flex flex-col gap-4">
        <p className=' font-bold text-white flex items-center gap-2 text-xl'><TbBuildingSkyscraper className='text-4xl text-purple'/> VirtuEstate</p>
        <p className='text-lg text-white font-semibold'>Conference Id: <span className='text-purple font-bold'>{meetingId}</span></p>
        <button onClick={()=>{
          console.log('Join called');
          join();
          joinMeeting();
        }} className='bg-purple p-2 rounded-xl text-white'>Join the Conference.</button>
      </div>

      </div>

    </div>
  )
}

export default PreSetupScreen