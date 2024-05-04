import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'

type Props = {buttonTitle:React.ReactNode,  dialogTitle:string, dialogDescription:string, dialogContent:React.ReactNode}

function ModalDialog({buttonTitle, dialogTitle, dialogDescription, dialogContent}: Props) {

  const [open, setOpen]=useState<boolean>(false);

  return (
    <Dialog onOpenChange={()=>!open} open={open} defaultOpen={false}>
    <DialogTrigger onClick={()=>setOpen(true)}>{buttonTitle}</DialogTrigger>
    <DialogContent className='bg-darkGray z-[90]'>
      <DialogHeader>
        <DialogTitle className='text-lg font-bold text-white'>{dialogTitle}</DialogTitle>
        <DialogDescription className='text-white hidden'>
         {dialogDescription}
        </DialogDescription>
      </DialogHeader>
    {open && dialogContent}
    </DialogContent>
  </Dialog>
  )
}

export default ModalDialog