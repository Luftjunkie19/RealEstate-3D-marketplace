import { SelectItem } from '@/components/ui/select'
import { CameraDeviceInfo, MicrophoneDeviceInfo } from '@videosdk.live/react-sdk'
import { PlaybackDeviceInfo } from '@videosdk.live/react-sdk/dist/types/deviceInfo'
import React from 'react'

type Props = {value:MicrophoneDeviceInfo | CameraDeviceInfo | PlaybackDeviceInfo | string, label:string}

function SelectListItem({value, label}: Props) {
  return (
    <SelectItem className='text-white  hover:bg-purple selection:bg-purple' value={value ? value : 'all'}>{label}</SelectItem>
  )
}

export default SelectListItem