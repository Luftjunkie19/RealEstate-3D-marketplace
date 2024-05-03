/* eslint-disable react/no-children-prop */
'use client';

import React from "react";

import CameraContent from "@/app/components/CameraContent/CameraContent";
import VideoProvider from "@/utils/contexts/VideoProvider";
import { useAuthContext } from "@/utils/hooks/useAuthContext";
import { useMediaDevice } from "@videosdk.live/react-sdk";

export default function Page({ params }: { params: { channelId: string } }) {
   
  const {user}=useAuthContext();
  const channelName=params.channelId;

 
    return (
         <VideoProvider metaData={user?.user_metadata as any} userID={user && user.id as any} path={channelName} username={user && user.user_metadata.full_name}>
           <CameraContent meetingID={channelName}/>
        </VideoProvider>
    );
}
