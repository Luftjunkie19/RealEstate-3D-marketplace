
'use client';
import React from 'react';

type Props = {
  meetingID: string,
  setEnabledMic: React.Dispatch<React.SetStateAction<boolean>>,
  setEnabledCamera: React.Dispatch<React.SetStateAction<boolean>>,
  enabledMic: boolean,
  enabledCam: boolean,
}

export function ConferenceScreen({meetingID, setEnabledCamera, setEnabledMic, enabledCam, enabledMic}: Props) {
 return  (<main>
    <p>{ }</p>
 </main>
  )
}

