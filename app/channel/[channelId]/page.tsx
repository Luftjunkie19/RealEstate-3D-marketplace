'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ParticipantView from "@/app/components/camera/ParticipantView";
import CameraContent from "@/app/components/CameraContent/CameraContent";

export default function Page({ params }: { params: { channelName: string } }) {
   

    return (
        <MeetingProvider
            config={{
                meetingId: "w4pp-zx0r-fnc9",
                micEnabled: true,
                webcamEnabled: true,
                name: "Lucas's Org",
                debugMode: true,
            }}
            token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmYzYyMzRiYi0zYzA1LTQyNjAtOGRmYS01NTkxMDAxMGM4ZDgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDU3MjE3MywiZXhwIjoxNzE1MTc2OTczfQ.IoYpuzwc9FImuLgmSSCdv4SvvCoUlJNDG2kj8sZFY3s'}
        >
           <CameraContent/>
        </MeetingProvider>
    );
}
