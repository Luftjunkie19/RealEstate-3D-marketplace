'use client';

import React, {
  useRef,
  useState,
} from 'react';

import { useControls } from 'leva';
import { BiSolidCartAdd } from 'react-icons/bi';
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaHome,
} from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import { HiOutlineCubeTransparent } from 'react-icons/hi2';
import { MdOutlineGridOn } from 'react-icons/md';
import { RiSave2Fill } from 'react-icons/ri';
import * as THREE from 'three';

import {
  CameraControls,
  Grid,CycleRaycast
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import FurnitureDrawer from './drawers/FurnitureDrawer';
import GltfObject, { Gltf3dObject } from './GltfObject';

type Props = {
  set3dObject: (object: Object | null) => void,
  object3D: Object | null
}

function DimensionalPlanner({ set3dObject, object3D }: Props) {
  const [furnitureDrawer, setFurnitureDrawer]=useState(false);
  const groupRef= useRef<THREE.Group>(null);
  const floorRef=useRef<THREE.Mesh>(null);
  const floorPlaneRef= useRef<THREE.PlaneGeometry>(null);
  const wall1Ref=useRef<THREE.Mesh>(null);
  const wall1PlaneRef=useRef<THREE.PlaneGeometry>(null);
   const wall2Ref=useRef<THREE.Mesh>(null);
   const wall2PlaneRef=useRef<THREE.PlaneGeometry>(null);
    const wall3Ref=useRef<THREE.Mesh>(null);
    const wall3PlaneRef=useRef<THREE.PlaneGeometry>(null);
     const wall4Ref=useRef<THREE.Mesh>(null);
     const objectReference=useRef<THREE.Object3D<THREE.Object3DEventMap>>(null);
     const wall4PlaneRef=useRef<THREE.PlaneGeometry>(null);
     const transformControlsRef=useRef<any>(null);

const [models, setModels]=useState<Gltf3dObject[] | null>([]);

const selectModels=(paramObject:Gltf3dObject)=>{
  setModels([...(models as Gltf3dObject[]), paramObject]);
}

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
              <button onClick={()=>set3dObject({
                floor:{
                  mesh:floorRef.current,
                  geometry:floorPlaneRef.current
                },
                walls:[{mesh:wall1Ref.current, geometry:wall1PlaneRef.current}, 
                  {mesh:wall2Ref.current, geometry:wall2PlaneRef.current}, 
                {mesh:wall3Ref.current, geometry:wall3PlaneRef.current},
                {mesh:wall4Ref.current, geometry:wall4PlaneRef.current}
                ],
                objects:models,
              })}>
                <RiSave2Fill className="text-2xl"/>
              </button>
              <button>
                <GiExitDoor className='text-2xl text-red-500'/>
              </button>
          </div>

<FurnitureDrawer addModel={selectModels} isOpen={furnitureDrawer} close={()=>setFurnitureDrawer(false)}/>


          <div className='w-full h-screen relative top-0 left-0'>        
          <Canvas>
    
   <CameraControls makeDefault/>
              <ambientLight />

<Grid cellSize={0.1} args={[20, 20]} sectionSize={1} scale={10} position-y={-0.5} />

<group ref={groupRef} >
   <mesh ref={wall1Ref} rotation-y={1.57} rotation-x={firstWallControls.wallRotation.x}  scale-y={firstWallControls.wall1YScale} scale-z={firstWallControls.wall1ZScale} scale-x={levaControls.floorYScale} position-z={firstWallControls.wall1Position.z} position-y={firstWallControls.wall1Position.y} position-x={-levaControls.floorXScale / 2} >
                  <planeGeometry ref={wall1PlaneRef} />
                  <meshBasicMaterial  side={THREE.DoubleSide} color="red" />
              </mesh>
    
   {models!.length > 0 && models?.map((item, i)=>(<GltfObject position={item.position} key={i} gltfObjectUrl={item.gltfObjectUrl} scale={item.scale} />))}
    


    <mesh ref={wall2Ref} scale-x={levaControls.floorYScale} rotation-y={1.57} rotation-z={secondWallControls.wallRotation.z} rotation-x={secondWallControls.wallRotation.x} position-x={levaControls.floorXScale / 2} position-y={secondWallControls.wallYScale / 2} position-z={secondWallControls.wallPosition.z} >
                  <planeGeometry ref={wall2PlaneRef}  />
                  <meshBasicMaterial side={THREE.DoubleSide} color="green" />
              </mesh>
    


        <mesh ref={wall3Ref} scale-x={levaControls.floorXScale} position-x={thirdWallContols.wallPosition.x} position-y={thirdWallContols.wallPosition.y} position-z={-levaControls.floorYScale / 2} rotation-x={thirdWallContols.wallRotation.x} rotation-y={thirdWallContols.wallRotation.y} rotation-z={thirdWallContols.wallRotation.z}>
                  <planeGeometry ref={wall3PlaneRef} />
                  <meshBasicMaterial side={THREE.DoubleSide} color="purple" />
              </mesh>

                <mesh ref={wall4Ref} rotation-x={fourthWallControls.wallRotation.x} rotation-y={fourthWallControls.wallRotation.y} rotation-z={fourthWallControls.wallRotation.z} scale-z={fourthWallControls.wallZScale} scale-y={fourthWallControls.wallYScale}  scale-x={levaControls.floorXScale} position-x={fourthWallControls.wallPosition.x} position-z={levaControls.floorYScale / 2} position-y={fourthWallControls.wallPosition.y}>
                  <planeGeometry ref={wall4PlaneRef} />
                  <meshBasicMaterial side={THREE.DoubleSide} color="blue" />
              </mesh>




<mesh ref={floorRef} onClick={()=>console.log({
firstWall: wall1Ref.current,
secondWall: wall2Ref.current,
thirdWall: wall3Ref.current,
fourthWall: wall4Ref.current,
floor: floorRef.current,
floorPlane: floorPlaneRef.current,
groupRef:groupRef.current,
              })}  rotation-x={-Math.PI / 2}>
                  <planeGeometry ref={floorPlaneRef} args={[levaControls.floorXScale, levaControls.floorYScale, levaControls.floorZScale]} />
                  <meshBasicMaterial side={THREE.DoubleSide} color="white" />
              </mesh>
</group>


          </Canvas>
          <div className="sticky bottom-0 left-0 m-12 flex gap-6 items-center">
          <button className="bg-purple p-3 rounded-lg h-fit">
          <FaHome size={20} className="text-white"/>
        </button>
        <div className="flex flex-col items-center gap-2">
        <button className="bg-purple p-3 text-white rounded-lg w-fit">
          <FaArrowUp fontSize={14}/>
        </button>
        <div className="flex gap-2">
        <button className="bg-purple p-3 text-white rounded-lg">
          <FaArrowLeft fontSize={14}/>
        </button>
        <button className="bg-purple p-3 text-white rounded-lg">
          <FaArrowDown fontSize={14}/>
        </button>
        <button className="bg-purple p-3 text-white rounded-lg">
          <FaArrowRight fontSize={14}/>
        </button>
        </div>

        </div>
          </div>
    </div>

    </div>
  )
}

export default DimensionalPlanner
