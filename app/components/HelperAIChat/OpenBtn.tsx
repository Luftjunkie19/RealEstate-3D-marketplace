'use client'
import React from 'react'
import { RiRobot3Line } from "react-icons/ri";
import { RiRobot3Fill } from "react-icons/ri";
type Props = {toggleOpenState:()=>void, open:boolean}

function OpenBtn({toggleOpenState, open}: Props) {
  return (
    <button onClick={toggleOpenState} className={`fixed transition-all bottom-1 right-1 ${open ? 'bg-purple' : 'bg-red-500'}  p-4 rounded-full`}>
   { open ? <RiRobot3Fill className='text-white'/> : <RiRobot3Line className='text-white'/>}
</button>
  )
}

export default OpenBtn