'use client'
import React, { useState } from 'react'
import { RiRobot3Line } from "react-icons/ri";
import Chat from './Chat';
import OpenBtn from './OpenBtn';



function HelperChat() {
    const [open, setOpen]=useState<boolean>(false);
    const toggleState=()=>{
        setOpen(!open);
    }
  return (
    <>
   <OpenBtn open={open} toggleOpenState={toggleState}/>
        <Chat openState={open}/>
    </>
  )
}

export default HelperChat