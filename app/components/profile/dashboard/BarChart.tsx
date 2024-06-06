'use client';
import React from 'react'
import {ResponsiveContainer, YAxis,BarChart, Tooltip, XAxis, Bar} from 'recharts';
type Props = {listings?:any[]}

function RecentListingsBarChart({listings,}: Props) {
  const defaultElements=[{
    label: '5 days', 
    propertiesAmount: 4
},
{
  label: '4 days', 
  propertiesAmount: 7
},
{
  label: '3 days', 
  propertiesAmount: 2,
  
},
{
  label: '2 days', 
  propertiesAmount: 5
},
{
  label: '1 days', 
  propertiesAmount: 1
},

]
  return (
    <div className='max-w-lg w-full h-64 bg-darkGray p-4 rounded-lg'>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <BarChart height={60} width={60} data={listings ? listings : defaultElements}>
          <YAxis />
          <XAxis fill='#ffffff' dataKey={'label'}/>
  <Tooltip  useTranslate3d />
  <Bar isAnimationActive fill="#703BF7" dataKey={'propertiesAmount'}/>
          </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default RecentListingsBarChart