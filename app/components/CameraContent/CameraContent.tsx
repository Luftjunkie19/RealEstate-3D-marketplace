'use client';
import { RiCameraOffFill } from "react-icons/ri";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useCallback, useEffect, useState } from 'react'
import ParticipantView from '../camera/ParticipantView';
import { FaCamera, FaMicrophone, FaPhone, FaRegMessage } from 'react-icons/fa6';
import toast from "react-hot-toast";
type Props = {meetingID: string}
import {FadeLoader} from 'react-spinners';
function CameraContent({meetingID}: Props) {
    const [joined, setJoined] = useState<string | null>(null);
    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
  
    const { join, participants, toggleMic, toggleWebcam, leave, localMicOn, localWebcamOn, end, meeting
     } = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      onParticipantJoined(participant) {
        toast(`${participant.displayName} joined the Conference`, {
          position:'bottom-right',
          className:" border-2 border-purple bg-darkGray"
        })
      },
      onChatMessage(messageData) {
      
          const { senderId, senderName, message } = messageData;
      
          console.log(messageData.text, message);
          
          const messageText = JSON.parse(messageData.text).message!;
      
        
        
        toast(`${senderName}: ${messageText}`, {className:" border-2 border-purple bg-darkGray", position:'top-right'})
      },
      onParticipantLeft(participant) {
        
      },
     
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
      if(participants.size === 1){
        end();
        window.location.href='/';
      }
      leave();
      setJoined(null);
    }

    const sendMessage= (formData:FormData)=>{
      const messageText= formData.get('message') as string;
      console.log(messageText);
      if(messageText.length > 0){
meeting.sendChatMessage(JSON.stringify({message:messageText}));
      }

    }

  return (
    <main className="w-screen h-screen">
                {joined === "JOINED" ? (
                <div className="w-full grid-flow-row-dense justify-items-stretch place-items-stretch grid  grid-cols-12">
                  <div className="p-4 flex flex-col lg:col-span-6 xl:col-span-9 gap-6 max-w-3xl">
                <div className='flex justify-around mx-auto m-0 max-w-2xl items-center gap-6 flex-wrap p-2'>
                        {participants && participants.size > 0 && [...participants.keys()].map((participantId) => (
                            <ParticipantView
                                participantId={participantId}
                                key={participantId}
                            />
                        ))}
                    </div>
                    <div className='flex self-center max-w-sm w-full my-4 p-2 rounded-lg mx-auto m-0 bg-darkGray gap-6 justify-center items-center sticky top-0 left-0'>
                  <button onClick={toggleWebcamHandler} className='text-white bg-purple p-3 rounded-full'>
                   {localWebcamOn ? <RiCameraOffFill/> : <FaCamera/>}  
                  </button>
                  <button onClick={leaveConference} className='text-white p-3 rounded-full bg-red-500'>
                    <FaPhone/>
                  </button>
                  <button onClick={toggleMicHandler} className='text-white bg-purple p-3 rounded-full'>
                  { !localMicOn ?  <FaMicrophone/> : <FaMicrophoneAltSlash/>}
                  </button>
                  </div>
                  </div>

<div className="sm:hidden relative top-0 left-0 lg:flex flex-col max-w-xs lg:col-span-6 xl:col-span-3 w-full gap-4 bg-darkGray h-screen rounded-l-lg">
  <p className="text-lg justify-center p-2 text-white font-semibold flex gap-4 items-center w-full border-bgColor border-b-2">Chat <FaRegMessage className="text-xl text-purple"/></p>
 <div className=" h-3/4 overflow-y-auto px-2 flex flex-col gap-2">
  {meeting.messages.map((message, i)=> (<div key={i} className=" bg-bgColor text-white p-2 rounded-lg">
    <p>{message.senderName}: {JSON.parse(message.text).message}</p>
  </div>))}
 </div>
  <form action={sendMessage} className="flex sticky bottom-0 left-0 gap-2 w-full bg-bgColor p-2 ">
<input name="message" className="p-1 outline-none max-w-56 rounded-lg text-white"/>
<button className="bg-purple px-2 py-1 rounded-lg text-white">Send</button>
  </form>
</div>

                </div>
                   
              
                ) : joined === "JOINING" ? (<div className="flex flex-col my-12 gap-4 items-center">
                  <FadeLoader color="#703BF7"  />
                  <p className="text-white text-lg">Joining the meeting...</p>
                </div>
                ) : joined === "ERROR" ? (
                    <p>Error joining the meeting. Please try again later.</p>
                ) : (
                  <div className="mx-auto my-12 flex flex-col gap-8 items-center justify-center">
                    <MdMeetingRoom className="text-6xl text-purple"/>
                    <p className="text-white text-lg">MeetingId: <span className="text-xl font-bold">{meetingID}</span></p>
                    <button className="text-white p-2 rounded-lg bg-purple" onClick={joinMeeting}>Join the meeting</button>
                  </div>
                )}



             
            </main>
  )
}

export default CameraContent