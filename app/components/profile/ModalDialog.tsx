import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { constants } from 'os';
import React, { useState } from 'react'

type Props = {buttonTitle:React.ReactNode,  dialogTitle:string, dialogDescription:string, dialogContent:React.ReactNode, footerContent:React.ReactNode}

function ModalDialog({buttonTitle, dialogTitle, dialogDescription, dialogContent, footerContent}: Props) {

  const [open, setOpen]=useState<boolean>(false);

  return (
    <Dialog onOpenChange={()=>setOpen(!open)} open={open} defaultOpen={false}>
    <DialogTrigger onClick={()=>setOpen(true)}>{buttonTitle}</DialogTrigger>
    <DialogContent className='bg-darkGray z-[90]'>
      <DialogHeader>
        <DialogTitle className='text-lg font-bold text-white'>{dialogTitle}</DialogTitle>
        <DialogDescription className='text-white hidden'>
         {dialogDescription}
        </DialogDescription>
      </DialogHeader>
    {open && dialogContent}
    <DialogFooter>
{footerContent}
    </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ModalDialog