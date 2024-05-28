import React from 'react';

import { SelectItem } from '@/components/ui/select';

type Props = {value:string, label:string}

function SelectListItem({value, label}: Props) {
  return (
    <SelectItem className='text-white  hover:bg-purple selection:bg-purple' value={value}>{label}</SelectItem>
  )
}

export default SelectListItem