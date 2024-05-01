import { MeetingProvider } from '@videosdk.live/react-sdk'
import React from 'react'

type Props = {children:React.ReactNode}

function VideoProvider({children}: Props) {
  return (
    <MeetingProvider
    config={{
      meetingId: "w4pp-zx0r-fnc9",
      micEnabled: true,
      webcamEnabled: true,
      name: "Lucas's Org",
      debugMode:true,
    }}
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmYzYyMzRiYi0zYzA1LTQyNjAtOGRmYS01NTkxMDAxMGM4ZDgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDU2NjQxOCwiZXhwIjoxNzE0NjUyODE4fQ.ELdie-CV5ExA_EhYo85xUx1xIXB1IKb8b7-hCpgNEzI"
  >
    {children}
  </MeetingProvider>
  )
}

export default VideoProvider