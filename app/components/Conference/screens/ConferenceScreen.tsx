/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { RiCameraOffFill } from "react-icons/ri";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { CameraDeviceInfo, Constants, createCameraVideoTrack, createMicrophoneAudioTrack, MicrophoneDeviceInfo, useMediaDevice, useMeeting } from '@videosdk.live/react-sdk';
import React, {  useEffect, useRef, useState } from 'react'
import ParticipantView from '../../ConferenceTiles/ParticipantView';
import { FaCamera, FaMicrophone, FaPhone, FaRegMessage, FaSpeakerDeck } from 'react-icons/fa6';
import toast from "react-hot-toast";
import { TbMessageCircleOff } from "react-icons/tb";
import { MdCallEnd } from "react-icons/md";
import cameraImg from '@/assets/camera-off.png'
import { TbMessageCircle2 } from "react-icons/tb";
import micImg from '@/assets/images.jpeg'

type Props = {
  meetingID: string, 
  accessMics: MicrophoneDeviceInfo[],
  accessSpeakers:PlaybackDeviceInfo[],
  accessCams: CameraDeviceInfo[],
  selectedCameraTrack:MediaStream | undefined,
selectedAudioTrack:MediaStream | undefined,
setEnabledMic: React.Dispatch<React.SetStateAction<boolean>>,
setEnabledCamera:React.Dispatch<React.SetStateAction<boolean>>,
enabledMic:boolean,
enabledCam:boolean, 
selectedMic: string | null,
selectedCam:string | null,
selectedSpeakers:string | null,
selectCam:React.Dispatch<React.SetStateAction<CameraDeviceInfo | null>>,
selectMic:React.Dispatch<React.SetStateAction<MicrophoneDeviceInfo | null>>,
selectSpeakers: React.Dispatch<React.SetStateAction<PlaybackDeviceInfo | null>>,
}
import {FadeLoader} from 'react-spinners';
import ChatDrawer from "../../ChatDrawer";
import ReactPlayer from "react-player";
import Image from "next/image";
import SelectionBar from "../items/SelectionBar";
import SelectListItem from "../items/SelectItem";
import { PlaybackDeviceInfo } from "@videosdk.live/react-sdk/dist/types/deviceInfo";
import { useRouter } from "next/navigation";
;

export default function CameraContent({meetingID, selectMic, selectCam, selectedSpeakers, selectSpeakers, selectedCam, selectedMic,  accessCams, accessSpeakers, accessMics, selectedAudioTrack, selectedCameraTrack, setEnabledCamera, setEnabledMic, enabledCam, enabledMic}: Props) {
  (<main>
   
 </main>
  )
}

