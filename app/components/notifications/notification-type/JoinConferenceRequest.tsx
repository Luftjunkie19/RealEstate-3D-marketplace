import React from 'react'

type Props = {notification:any, goToChannel:(notification: any) => Promise<void>, readNotification:(notification: any) => Promise<void>}

function JoinConferenceRequest({notification, goToChannel, readNotification}: Props) {
  return (
    <div className='bg-purple text-white p-2 rounded-xl flex gap-2 items-center' key={notification.roomId}>
            <p>{notification.message.length > 60 ? `${notification.message.slice(0, 40)}...` :  notification.message}</p>

            <div className="flex gap-2 items-center">
                <button onClick={async ()=>{
                   await goToChannel(notification);
                }} className='bg-green-500 py-2 rounded-xl h-fit px-4'>Join</button>
                <button onClick={async ()=>{
                    await readNotification(notification);
                }} className='bg-red-500 px-4 py-2 rounded-xl h-fit'>Ignore</button>
            </div>
        </div>
  )
}

export default JoinConferenceRequest