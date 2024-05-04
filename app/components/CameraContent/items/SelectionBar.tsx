import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

type Props = {children:React.ReactNode, placeholder:React.ReactNode, selectedOption:string, setChange:React.Dispatch<React.SetStateAction<any | null>>
}

function SelectionBar({children, placeholder, selectedOption, setChange}: Props) {
  return (
<Select value={selectedOption} onValueChange={(val)=>setChange(val)}>
  <SelectTrigger className="max-w-24">
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent className='bg-darkGray'>
    {children}
  </SelectContent>
</Select>
  )
}

export default SelectionBar