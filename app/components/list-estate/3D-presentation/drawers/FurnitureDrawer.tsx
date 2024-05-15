import Image from 'next/image'
import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'

import image from '@/assets/images.jpeg'
import { Gltf3dObject } from '../GltfObject'

type Props = {isOpen?:boolean, close:()=>void, addModel:(paramObject:Gltf3dObject)=>void}

function FurnitureDrawer({isOpen, close, addModel}: Props) {

  const selectModel=(passedObj:any)=>{
addModel({
  gltfObjectUrl:passedObj.modelUrl,
  scale:passedObj.scale,
  position:[
    0,
    0,
    0
  ]
});
    close();
  }


  return (
    <div className={`fixed top-0 left-0 rounded-r-2xl transition-all bg-bgColor h-full p-2 ${isOpen ? 'translate-x-0 z-[9999]' : '-translate-x-full'} max-w-3xl w-full`}>
        <div className="flex justify-between items-center px-4 py-2 border-darkGray">
<p className="text-3xl text-white">Virtu<span className='text-purple font-bold'>Estate</span></p>
<button onClick={close}>
                <FaCircleXmark className='text-red-500 text-4xl'/>
            </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-1 overflow-y-auto">
        <button className="flex flex-col gap-2 p-4 rounded-lg max-w-60 w-full bg-darkGray border-2 border-bgColor">
          <Image src={image} width={128} height={128} alt="" className="w-full h-24 rounded-md"/>
          <p className="text-white font-semibold text-xl">Chair</p>
          </button>
          <button className="flex flex-col gap-2 p-4 rounded-lg max-w-60 w-full bg-darkGray border-2 border-bgColor">
          <Image src={image} width={128} height={128} alt="" className="w-full h-24 rounded-md"/>
          <p className="text-white font-semibold text-xl">Bed</p>
          </button>
          <button className="flex flex-col gap-2 p-4 rounded-lg max-w-60 w-full bg-darkGray border-2 border-bgColor">
          <Image src={image} width={128} height={128} alt="" className="w-full h-24 rounded-md"/>
          <p className="text-white font-semibold text-xl">Toilet</p>
          </button>
          <button className="flex flex-col gap-2 p-4 rounded-lg max-w-60 w-full bg-darkGray border-2 border-bgColor">
          <Image src={image} width={128} height={128} alt="" className="w-full h-24 rounded-md"/>
          <p className="text-white font-semibold text-xl">Wardrobe</p>
          </button>
          <button className="flex flex-col gap-2 p-4 rounded-lg max-w-60 w-full bg-darkGray border-2 border-bgColor">
          <Image src={image} width={128} height={128} alt="" className="w-full h-24 rounded-md"/>
          <p className="text-white font-semibold text-xl">Desk</p>
          </button>
        </div>
    </div>
  )
}

export default FurnitureDrawer