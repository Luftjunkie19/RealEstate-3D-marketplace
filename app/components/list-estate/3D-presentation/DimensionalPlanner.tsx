import React from 'react';
import { HiOutlineCubeTransparent } from "react-icons/hi2";

import { BiSolidCartAdd } from 'react-icons/bi';
import { MdOutlineGridOn } from "react-icons/md";

import { Canvas } from '@react-three/fiber';

type Props = {}

function DimensionalPlanner({}: Props) {
  return (
      <div className='w-full h-full flex'>
          <div className="flex h-screen max-w-16 rounded-r-xl w-full p-4 flex-col gap-6 items-center bg-purple text-white">
              <button>
                  <BiSolidCartAdd className="text-2xl"/>
              </button>
                 <button>
                  <MdOutlineGridOn className="text-2xl"/>
              </button>
                 <button>
                  <HiOutlineCubeTransparent className="text-2xl"/>
              </button>
          </div>
          <Canvas className='w-full h-screen'>
              <ambientLight />


              <mesh rotation-x={-Math.PI / 2}>
                  <planeGeometry />
                  <meshBasicMaterial color="white" />
              </mesh>
              

          </Canvas>
    </div>
  )
}

export default DimensionalPlanner