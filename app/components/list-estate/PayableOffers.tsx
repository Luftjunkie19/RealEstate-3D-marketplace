import React from 'react'

type Props = {
selectedOption: null | number,
selectOption: (param: number) => void,
}

function PayableOffers({selectOption, selectedOption}: Props) {
  return (
    <div className="flex sm:flex-col gap-6 lg:flex-row max-w-5xl mx-auto m-0">

<button onClick={()=>selectOption(2.99)} className={`flex ${selectedOption === 2.99 && 'border-2 border-purple'} flex-col gap-4 max-w-sm bg-darkGray p-4 rounded-2xl`}>
    <p className='text-lg font-bold text-white'>Daily Promo</p>
    <ul className='flex flex-col gap-2 items-start'>
        <li>More shown Listing.</li>
        <li>Labeled with promoted sign for 1 day.</li>
    </ul>
    <div className="flex items-center justify-between gap-4 p-2">
        <p className='text-white'>Price</p>
        <p className='text-lg text-green-500 font-bold'>2.99$</p>
    </div>
</button>

<button onClick={()=>selectOption(4.99)} className={`flex ${selectedOption === 4.99 && 'border-2 border-purple'} flex-col gap-4 max-w-sm bg-darkGray p-4 rounded-xl`}>
    <p className='text-lg font-bold text-white'>Weekely Promo</p>
    <ul className='flex flex-col gap-2 items-start'>
        <li>More shown Listing.</li>
        <li>Labeled with promoted sign for 1 week.</li>
    </ul>
    <div className="flex items-center justify-between gap-4 p-2">
        <p className='text-white'>Price</p>
        <p className='text-lg text-green-500 font-bold'>4.99$</p>
    </div>
</button>

<button onClick={()=>selectOption(7.99)} className={`flex flex-col ${selectedOption === 7.99 && 'border-2 border-purple'} gap-4 max-w-sm bg-darkGray p-4 rounded-xl`}>
    <p className='text-lg font-bold text-white'>Monthly Promo</p>
    <ul className='flex flex-col gap-2 items-start'>
        <li>More shown Listing.</li>
        <li>Labeled with promoted sign for 1 month.</li>
    </ul>
    <div className="flex items-center justify-between gap-4 p-2">
        <p className='text-white'>Price</p>
        <p className='text-lg text-green-500 font-bold'>7.99$</p>
    </div>
</button>

    </div>
  )
}

export default PayableOffers