
import { MeetingProvider } from '@videosdk.live/react-sdk'
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

type Props = {children:React.ReactNode, username:string, channelName:string}

function VideoProvider({children, username, channelName}: Props) {
  return (
    <MeetingProvider
    config={{
      meetingId: channelName,
      micEnabled: true,
      webcamEnabled: true,
      name: username,
      debugMode:true,
    }}
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmYzYyMzRiYi0zYzA1LTQyNjAtOGRmYS01NTkxMDAxMGM4ZDgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDU2NjQxOCwiZXhwIjoxNzE0NjUyODE4fQ.ELdie-CV5ExA_EhYo85xUx1xIXB1IKb8b7-hCpgNEzI"
  >
    {children}
  </MeetingProvider>
  )
}

export default VideoProvider