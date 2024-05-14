'use client';

import React, { useRef, useState } from 'react';
import { RiSave2Fill } from "react-icons/ri";
import { useControls } from 'leva';
import { BiSolidCartAdd } from 'react-icons/bi';
import { HiOutlineCubeTransparent } from 'react-icons/hi2';
import { MdOutlineGridOn } from 'react-icons/md';
import * as THREE from 'three';

import {
  Grid,
  OrbitControls,
  OrthographicCamera,
} from '@react-three/drei';
import { Canvas, ThreeElements } from '@react-three/fiber';
import FurnitureDrawer from './drawers/FurnitureDrawer';
import { Model } from '../../3DmodelsEditable/Floorplan';

type Props = {}

function DimensionalPlanner({ }: Props) {

  const [furnitureDrawer, setFurnitureDrawer]=useState(false);

  const floorRef=useRef<THREE.PlaneGeometry>(null);
  const floorPlaneRef= useRef<THREE.Mesh>(null);

const levaControls =  useControls("floor", {
        floorPosition: {
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
    
});

const firstWallControls= useControls('Wall 1', {
    wall1Position:{
        value:{
              x: 0,
              y: 0.5,
              z:0,
          }, 
          step:0.01
      },
      wallRotation:{
        value:{
              x: 0,
              y: 0,
              z: 0,
          }, 
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

const secondWallControls= useControls('Wall 2', {
    wallPosition:{
        value:{
              x: 0,
              y: 0.5,
              z: 0,
          }, 
          step:0.01
      },
      wallRotation:{
        value:{
              x: 0,
              y: 0,
              z: 0,
          }, 
          step:0.01
      },
      wallXScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
   wallYScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
   wallZScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
});

const thirdWallContols= useControls('Wall 3', {
    wallPosition:{
        value:{
              x: 0,
              y: 0.5,
              z: 0.5,
          }, 
          step:0.01
      },
      wallRotation:{
        value:{
              x: 0,
              y: 0,
              z: 0,
          }, 
          step:0.01
      },
      wallXScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
   wallYScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
   wallZScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
});

const fourthWallControls = useControls('Wall 4', {
    wallPosition:{
        value:{
              x: 0,
              y: 0.5,
              z: 0.5,
          }, 
          step:0.01
      },
      wallRotation:{
        value:{
              x: 0,
              y: 0,
              z: 0,
          }, 
          step:0.01
      },
      wallXScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
   wallYScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
   wallZScale:{
        value:1,
      min:0.01,
      max:45,
      step:0.01
  },
});


  return (
      <div className='w-full h-full flex'>
          <div className="flex h-screen max-w-16 rounded-r-xl w-full p-4 flex-col gap-6 items-center bg-purple text-white">
              <button onClick={()=>setFurnitureDrawer(!furnitureDrawer)}>
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

<FurnitureDrawer isOpen={furnitureDrawer} close={()=>setFurnitureDrawer(false)}/>


          <div className='w-full h-screen'>        
          <Canvas>
            <OrbitControls/>
            <OrthographicCamera/>
              <ambientLight />

<Grid cellSize={1} args={[15.5, 15.5]} sectionSize={2.5} scale={10} position-y={-0.5} />

<group >
   <mesh rotation-y={1.57} rotation-x={firstWallControls.wallRotation.x}  scale-y={firstWallControls.wall1YScale} scale-z={firstWallControls.wall1ZScale} scale-x={levaControls.floorYScale} position-z={firstWallControls.wall1Position.z} position-y={firstWallControls.wall1Position.y} position-x={-levaControls.floorXScale / 2} >
                  <planeGeometry />
                  <meshBasicMaterial  side={THREE.DoubleSide} color="red" />
              </mesh>
    
   

    <mesh scale-x={levaControls.floorYScale} rotation-y={1.57} rotation-z={secondWallControls.wallRotation.z} rotation-x={secondWallControls.wallRotation.x} position-x={levaControls.floorXScale / 2} position-y={secondWallControls.wallYScale / 2} position-z={secondWallControls.wallPosition.z} >
                  <planeGeometry  />
                  <meshBasicMaterial side={THREE.DoubleSide} color="green" />
              </mesh>
    

        <mesh scale-x={levaControls.floorXScale} position-x={thirdWallContols.wallPosition.x} position-y={thirdWallContols.wallPosition.y} position-z={-levaControls.floorYScale / 2} rotation-x={thirdWallContols.wallRotation.x} rotation-y={thirdWallContols.wallRotation.y} rotation-z={thirdWallContols.wallRotation.z}>
                  <planeGeometry />
                  <meshBasicMaterial side={THREE.DoubleSide} color="purple" />
              </mesh>

                <mesh rotation-x={fourthWallControls.wallRotation.x} rotation-y={fourthWallControls.wallRotation.y} rotation-z={fourthWallControls.wallRotation.z} scale-z={fourthWallControls.wallZScale} scale-y={fourthWallControls.wallYScale}  scale-x={levaControls.floorXScale} position-x={fourthWallControls.wallPosition.x} position-z={levaControls.floorYScale / 2} position-y={fourthWallControls.wallPosition.y}>
                  <planeGeometry />
                  <meshBasicMaterial side={THREE.DoubleSide} color="blue" />
              </mesh>


              <mesh ref={floorPlaneRef} onClick={()=>console.log(floorRef.current, floorPlaneRef.current)}  scale-x={levaControls.floorXScale} scale-z={levaControls.floorZScale} scale-y={levaControls.floorYScale} rotation-x={-Math.PI / 2}>
                  <planeGeometry ref={floorRef} />
                  <meshBasicMaterial side={THREE.DoubleSide} color="white" />
              </mesh>
</group>

              

          </Canvas>
    </div>

    </div>
  )
}

export default DimensionalPlanner
