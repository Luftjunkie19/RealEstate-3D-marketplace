
import { MeetingProvider } from '@videosdk.live/react-sdk'
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

type Props = {
  children:React.ReactNode, 
  username:string, 
  path:string, 
  userID:string,
  metaData:Object,
}

function VideoProvider({children, username, path, userID, metaData}: Props) {
  return (
    <MeetingProvider
    token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmYzYyMzRiYi0zYzA1LTQyNjAtOGRmYS01NTkxMDAxMGM4ZDgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDY0MjU5MiwiZXhwIjoxODcyNDMwNTkyfQ.uWjFyMNr2MOKWg2nXMC-BdCw_Dv3LW97wzD_spBUAyU'}
    config={{
      meetingId: path,
      micEnabled: true,
      webcamEnabled: true,
      name: username,
      participantId: userID,
      debugMode:true,
      metaData:metaData,
    }}

    >
    {children}
  </MeetingProvider>
  )
}

export default VideoProvider