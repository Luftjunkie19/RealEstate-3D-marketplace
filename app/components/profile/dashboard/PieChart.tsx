'use client';
import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

type Props = {listings?:any[]}

function TypePieChart({listings}: Props) {
  const COLORS = ["#703BF7", "#36a1ff"];
  return (
    <div className='max-w-xs w-full h-64  bg-darkGray p-4 rounded-lg'>
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <PieChart data={listings}>
      <Legend />
      <Tooltip/>
      <Pie isAnimationActive data={listings} dataKey="propertiesAmount" nameKey="propertyType" cx="50%" cy="50%" outerRadius={70} fill="#703BF7">
        {listings && listings.map((item, i )=>(<Cell fill={COLORS[i]} key={`cell-${i}`}/>))}
      </Pie>
      </PieChart>
    </ResponsiveContainer>
</div>
  )
}

export default TypePieChart