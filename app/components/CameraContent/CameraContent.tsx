'use client';

import { useMeeting } from '@videosdk.live/react-sdk';
import React, { useCallback, useEffect, useState } from 'react'
import ParticipantView from '../camera/ParticipantView';
import { FaCamera, FaMicrophone, FaPhone } from 'react-icons/fa6';

type Props = {}

function CameraContent({}: Props) {
    const [joined, setJoined] = useState<string | null>(null);
    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    const { join, participants, toggleMic, toggleWebcam, leave
     } = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
        setJoined("JOINED");
      }
    });
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

    const toggleMicHandler = () => {
      toggleMic();

      
    }
    const toggleWebcamHandler = () => {
      toggleWebcam();
    }

    const leaveConference= ()=>{
      leave();
      setJoined(null);
    }

  return (
    <main className="flex w-full flex-col gap-4 min-h-screen">
                {joined === "JOINED" ? (
                    <div className='flex justify-around mx-auto m-0 max-w-7xl items-center gap-6 flex-wrap p-2'>
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

                {joined === "JOINED" && <div className='flex max-w-sm p-2 rounded-lg bg-darkGray gap-6 justify-center items-center sticky translate-y-0 lg:-translate-x-1/2 bottom-0 left-1/2'>
                  <button onClick={toggleWebcamHandler} className='text-white bg-purple p-3 rounded-full'>
                    <FaCamera/>
                  </button>
                  <button onClick={leaveConference} className='text-white p-3 rounded-full bg-red-500'>
                    <FaPhone/>
                  </button>
                  <button onClick={toggleMicHandler} className='text-white bg-purple p-3 rounded-full'>
                    <FaMicrophone/>
                  </button>
                  </div>}
            </main>
  )
}

export default CameraContent