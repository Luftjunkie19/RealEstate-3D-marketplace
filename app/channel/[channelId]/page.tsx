/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
'use client';

import { useState } from 'react';

import { useAuthContext } from '@/utils/hooks/useAuthContext';

export default function Page({ params }: { params: { channelId: string } }) {
   
  const {user}=useAuthContext();
  const meetingId = params.channelId.split('>')[0];
  const token = process.env.NEXT_PUBLIC_VIDEOSDK_TOKEN;

  const [joinedMeeting, setJoinedMeeting] = useState(false);
  const [leftMeeting, setLeftMeeting]=useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState(null);
  const [customVideoStream, setCustomVideoStream] = useState(null);


    return (<div></div>);
}
