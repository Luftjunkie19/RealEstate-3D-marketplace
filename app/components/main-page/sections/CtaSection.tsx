import React from 'react';

import Image from 'next/image';
import leftSide from '@/assets/AbstractDesign-Footer-Left.png';
import rightSide from '@/assets/AbstractDesign-Footer-Right.png';
import classes from '@/stylings/CTA.module.css';

type Props = {}

function CtaSection({}: Props) {
  return (
      <div className={`${classes.cta} flex sm:flex-col lg:flex-row gap-4 bg-darkGray py-12 px-8 justify-between items-center`}>
          <Image width={208} height={256} alt='' src={rightSide} className=' absolute object-cover top-0 right-0 max-w-2xl w-full h-full ' />
                    <Image width={208} height={256} alt='' src={leftSide} className=' absolute top-0 left-0 max-w-2xl w-full h-full object-cover' />
          <div className=" max-w-3xl z-[1] flex flex-col gap-2 py-2">
              <p className='text-white text-3xl font-bold'>Start Your Real Estate Journey Today</p>
              <p className="text-white">Your dream property is just a click away. Whether you are looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.</p>
          </div>

        <button className="bg-purple z-[1] sm:w-full lg:max-w-xs w-full p-3 rounded-lg text-base text-white">Explore Properties</button>
        
    </div>
  )
}

export default CtaSection