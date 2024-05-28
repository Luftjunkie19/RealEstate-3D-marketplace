'use client';

import { useState } from 'react';

import { Provider } from 'react-redux';

import {
  ConferenceScreen,
} from '@/app/components/Conference/screens/ConferenceScreen';
import LeftConferenceScreen
  from '@/app/components/Conference/screens/LeftConferenceScreen';
import PreSetupScreen from '@/app/components/Conference/screens/PreSetupScreen';
import { store } from '@/utils/contexts/store';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { channelId: string } }) {
   
  const {user}=useAuthContext();
  const meetingId = params.channelId;
  const token = process.env.NEXT_PUBLIC_VIDEOSDK_TOKEN;

  const [joinedMeeting, setJoinedMeeting] = useState(false);
  const [leftMeeting, setLeftMeeting]=useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const router= useRouter();
  const [customAudioStream, setCustomAudioStream] = useState<MediaStream | undefined >(undefined);
  const [customVideoStream, setCustomVideoStream] = useState<MediaStream | undefined >(undefined);
  const joinMeeting=()=>{
    setJoinedMeeting(true);
  }

  const leaveMeeting=()=>{
    setMicOn(false);
    setCamOn(false);
    setJoinedMeeting(false);
    setLeftMeeting(true);
  }


  return (
    <Provider store={store}>
       <MeetingProvider config={{
  meetingId,
  participantId: user?.id,
  name: user?.user_metadata.user_name,
  micEnabled: micOn,
  webcamEnabled: camOn,
  customCameraVideoTrack: customVideoStream,
  customMicrophoneAudioTrack: customAudioStream,
  metaData: user?.user_metadata,
  debugMode: false,
}} token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmYzYyMzRiYi0zYzA1LTQyNjAtOGRmYS01NTkxMDAxMGM4ZDgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDY0MjU5MiwiZXhwIjoxODcyNDMwNTkyfQ.uWjFyMNr2MOKWg2nXMC-BdCw_Dv3LW97wzD_spBUAyU'} > 
      {joinedMeeting && (    
       
<ConferenceScreen participantId={user?.id as string} leaveMeeting={leaveMeeting} meetingID={meetingId} setEnabledMic={()=>setMicOn(!micOn)} setEnabledCamera={()=>setCamOn(!camOn)} 
  enabledMic={micOn} enabledCam={camOn}/>
)}
        {leftMeeting && <LeftConferenceScreen />}
        {!joinedMeeting && !leftMeeting && <PreSetupScreen joinMeeting={joinMeeting} meetingId={meetingId} micOn={micOn} camOn={camOn} setCustomVideoStream={(value)=>setCustomVideoStream(value)} setCustomAudioStream={(value)=>setCustomAudioStream(value)} setCamOn={function (value: boolean): void {
          setCamOn(value);
        }} setMicOn={function (value: boolean): void {
          setMicOn(value);
        }}/>}
          </MeetingProvider>
    </Provider>
  );
}