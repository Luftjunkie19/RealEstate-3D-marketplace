'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ParticipantView from "@/app/components/camera/ParticipantView";
import CameraContent from "@/app/components/CameraContent/CameraContent";
import VideoProvider from "@/utils/contexts/VideoProvider";
import { useAuthContext } from "@/utils/hooks/useAuthContext";

export default function Page({ params }: { params: { channelId: string } }) {
   
    const {user}=useAuthContext();

    return (
         <VideoProvider channelName={params.channelId} username={user && user.user_metadata ? user.user_metadata.user_name : 'Default user'}>
           <CameraContent/>
        </VideoProvider>
    );
}
