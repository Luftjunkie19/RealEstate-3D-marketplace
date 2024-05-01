'use client';

import { useMeeting } from '@videosdk.live/react-sdk';
import React, { useCallback, useEffect, useState } from 'react'
import ParticipantView from '../camera/ParticipantView';

type Props = {}

function CameraContent({}: Props) {
    const [joined, setJoined] = useState<string | null>(null);
    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    const { join, participants } = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
        setJoined("JOINED");
      }
    });
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

  return (
    <main className="flex w-full flex-col min-h-screen">
                {joined === "JOINED" ? (
                    <div>
                        {participants && participants.size > 0 && [...participants.keys()].map((participantId) => (
                            <ParticipantView
                                participantId={participantId}
                                key={participantId}
                            />
                        ))}
                    </div>
                ) : joined === "JOINING" ? (
                    <p>Joining the meeting...</p>
                ) : joined === "ERROR" ? (
                    <p>Error joining the meeting. Please try again later.</p>
                ) : (
                    <button onClick={joinMeeting}>Join the meeting</button>
                )}
            </main>
  )
}

export default CameraContent