'use client';

import React from 'react';
import { RiSave2Fill } from "react-icons/ri";
import { useControls } from 'leva';
import { BiSolidCartAdd } from 'react-icons/bi';
import { HiOutlineCubeTransparent } from 'react-icons/hi2';
import { MdOutlineGridOn } from 'react-icons/md';
import * as THREE from 'three';

import {
  Grid,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

type Props = {}

function DimensionalPlanner({ }: Props) {

const levaControls =  useControls("floor", {
        floorPosition: {
            value:{
                x: 0,
                y: 0,
                z:0,
            },
            step:0.01
        },
        wall1Position:{
          value:{
                x: 0,
                y: 0,
                z:0,
            }, 
            step:0.01
        },
    floorXScale:{
        value:1,
        min:0.01,
        max:45,
        step:0.01
    },
    floorYScale:{
         value:1,
        min:0.01,
        max:45,
        step:0.01
    },
    floorZScale:{
         value:1,
        min:1,
        max:45,
        step:0.01
    },
    wall1XScale:{
          value:1,
        min:0.01,
        max:45,
        step:0.01
    },
     wall1YScale:{
          value:1,
        min:0.01,
        max:45,
        step:0.01
    },
     wall1ZScale:{
          value:1,
        min:0.01,
        max:45,
        step:0.01
    },
});



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
              <button>
                <RiSave2Fill className="text-2xl"/>
              </button>
          </div>
          <div className='w-full h-screen'>        
          <Canvas>
            <OrbitControls/>
              <ambientLight />

<Grid cellSize={1} args={[15.5, 15.5]} sectionSize={2.5} scale={10} position-y={-0.5} />

<group>
   <mesh scale-y={levaControls.wall1YScale} scale-z={levaControls.wall1ZScale} scale-x={levaControls.wall1XScale} position-z={levaControls.wall1Position.z} position-y={levaControls.wall1Position.y} position-x={levaControls.wall1Position.x} onClick={()=>console.log(levaControls)}>
                  <planeGeometry />
                  <meshBasicMaterial side={THREE.DoubleSide} color="red" />
              </mesh>
    
    <mesh >
                  <planeGeometry />
                  <meshBasicMaterial side={THREE.DoubleSide} color="black" />
              </mesh>
    

        <mesh >
                  <planeGeometry />
                  <meshBasicMaterial side={THREE.DoubleSide} color="purple" />
              </mesh>

                <mesh >
                  <planeGeometry />
                  <meshBasicMaterial side={THREE.DoubleSide} color="blue" />
              </mesh>


              <mesh scale-x={levaControls.floorXScale} scale-z={levaControls.floorZScale} scale-y={levaControls.floorYScale} rotation-x={-Math.PI / 2}>
                  <planeGeometry />
                  <meshBasicMaterial side={THREE.DoubleSide} color="white" />
              </mesh>
</group>

              

          </Canvas>
    </div>

    </div>
  )
}

export default DimensionalPlanner
