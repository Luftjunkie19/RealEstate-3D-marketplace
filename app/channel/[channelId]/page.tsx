/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
'use client';

import { useState } from 'react';

import { Provider } from 'react-redux';

import {
  ConferenceScreen,
} from '@/app/components/Conference/screens/ConferenceScreen';
import { store } from '@/utils/contexts/store';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { MeetingProvider } from '@videosdk.live/react-sdk';

export default function Page({ params }: { params: { channelId: string } }) {
   
  const {user}=useAuthContext();
  const meetingId = params.channelId.split('>')[0];
  const token = process.env.NEXT_PUBLIC_VIDEOSDK_TOKEN;

  const [joinedMeeting, setJoinedMeeting] = useState(false);
  const [leftMeeting, setLeftMeeting]=useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState<MediaStream | undefined >(undefined);
  const [customVideoStream, setCustomVideoStream] = useState<MediaStream | undefined >(undefined);


  return (
    <Provider store={store}>
    <MeetingProvider config={{
    meetingId,
    participantId: user?.id,
    name: user?.user_metadata.nickname,
    micEnabled: micOn,
    webcamEnabled: camOn,
    customCameraVideoTrack: customVideoStream,
    customMicrophoneAudioTrack: customAudioStream,
    metaData: user?.user_metadata,
    debugMode: true
  }} token={token as string}>
      {joinedMeeting && <ConferenceScreen meetingID={meetingId}  setEnabledMic={()=>setMicOn(!micOn)} setEnabledCamera={()=>setCamOn(!camOn)} enabledMic={micOn} enabledCam={camOn}/>}
    </MeetingProvider>
    </Provider>
  );
}
