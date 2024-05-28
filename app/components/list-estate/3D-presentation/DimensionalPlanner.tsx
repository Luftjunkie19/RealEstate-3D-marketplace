'use client';
import { GiBrickWall } from "react-icons/gi";
import React, {
  useCallback,
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
  Grid,CycleRaycast,
  useTexture,
  CameraControlsProps
} from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';

import FurnitureDrawer from './drawers/FurnitureDrawer';
import GltfObject, { Gltf3dObject } from './GltfObject';
import ElementManagment from './drawers/ElementManagment';
import Floor from './3D-components/Floor';
import Wall1 from './3D-components/Wall1';
import Wall2 from './3D-components/Wall2';
import Wall3 from './3D-components/Wall3';
import Wall4 from './3D-components/Wall4';
import AdditionalWall from "./3D-components/AdditionalWall";
import { DEG2RAD } from "three/src/math/MathUtils.js";

type Props = {
  set3dObject: (object: Object | null) => void,
  object3D: Object | null,
  moveForward: ()=>void,
}

function DimensionalPlanner({ set3dObject, object3D, moveForward}: Props) {
  const [gltfObjects, setGltfObjects]=useState<any[]>([]);
  const [additionalWalls, setAdditionalWalls]=useState<any[]>([]);
  const [furnitureDrawer, setFurnitureDrawer]=useState(false);
  const groupRef = useRef<THREE.Group>(null);
  
  //
  const floorRef=useRef<THREE.Mesh>(null);
  const floorMaterialRef=useRef<THREE.MeshBasicMaterial>(null);
  const floorPlaneRef= useRef<THREE.PlaneGeometry>(null);
  //
  const wall1Ref=useRef<THREE.Mesh>(null);
  const wall1PlaneRef=useRef<THREE.PlaneGeometry>(null);
  const wall1MaterialRef=useRef<THREE.MeshBasicMaterial>(null);
  //
   const wall2Ref=useRef<THREE.Mesh>(null);
   const wall2PlaneRef=useRef<THREE.PlaneGeometry>(null);
   const wall2MaterialRef=useRef<THREE.MeshBasicMaterial>(null);

  //
    const wall3Ref=useRef<THREE.Mesh>(null);
    const wall3PlaneRef=useRef<THREE.PlaneGeometry>(null);
    const wall3MaterialRef=useRef<THREE.MeshBasicMaterial>(null);

  //
     const wall4Ref=useRef<THREE.Mesh>(null);
     const wall4PlaneRef=useRef<THREE.PlaneGeometry>(null);
     const wall4MaterialRef=useRef<THREE.MeshBasicMaterial>(null);

const [objectToEdit, setObjectToEdit]=useState<any>(null);
const [models, setModels]=useState<Gltf3dObject[] | null>([]);

  const cameraControlsRef = useRef<CameraControls>(null);

const moveCameraForward= ()=>{
cameraControlsRef.current?.dolly(0.25, true);

}

const moveCameraBack= ()=>{
cameraControlsRef.current?.dolly(-0.25, true);
}

const moveCameraRight= ()=>{
   cameraControlsRef.current?.rotate(20 * DEG2RAD, 0, true);
}
const moveCameraLeft= ()=>{
      cameraControlsRef.current?.rotate(-20 * DEG2RAD, 0, true);
}

  
const moveToBasePosition=()=>{
  if(cameraControlsRef.current){
    cameraControlsRef.current.zoom(1, true);
       cameraControlsRef.current?.rotate(0, 0, true);
  }
}

const selectToEdit= (obj:any)=>{
  setObjectToEdit(obj);
}

const selectModels=(paramObject:Gltf3dObject)=>{
  setModels([...(models as Gltf3dObject[]), paramObject]);
}

const deleteModel=(uuid:string, id:string , isGltf:boolean)=>{
  console.log(uuid,id, isGltf);
  if(isGltf){
    setModels((models as Gltf3dObject[]).filter(model=>model.id !== id));
    setGltfObjects((gltfObjects as Gltf3dObject[]).filter((model)=>(model as any).uuid !== uuid));
  }else{
    setAdditionalWalls((additionalWalls as any[]).filter((model)=>model.id !== uuid));
  }
  console.log(models, gltfObjects, additionalWalls);
  setObjectToEdit(null);
}

const saveChanges=(obj:any, isGltf:boolean)=>{
  if(isGltf){
    if(gltfObjects.find((item)=>item.uuid === obj.uuid)){
      const gltfObjectIndex= gltfObjects.findIndex((item)=>item.uuid === obj.uuid);
      gltfObjects[gltfObjectIndex]=obj;
    }else{
      setGltfObjects([...gltfObjects, obj]);
    }
  }else{
    console.log(obj);

    if(additionalWalls.find(item=>item.id === obj.id)){
      const wallIndex= additionalWalls.findIndex((item)=>item.id === obj.id);
      additionalWalls[wallIndex]=obj;
    }else{
      setAdditionalWalls([...additionalWalls, obj]);
    }


  }
  console.log(gltfObjects)
  setObjectToEdit(null);
}


const levaControls =  useControls("floor", {
  materialColour:{
value:'#fff'
  },
  material:{
    value:'',
    options:{
    null:'',
     texture1: './textures/brick.jpg',
     texture2:'./textures/brick2.jpg',
     texture3:'./textures/brick3.jpg',
     texture4:'./textures/brick4.jpg',
     texture5:'./textures/brick5.png',
     texture6:'./textures/brick6.png',
     texture7:'./textures/brick7.png',
     texture8:'./textures/brick8.png',
     texture9:'./textures/brick9.jpg',
     texture10:'./textures/brick10.jpg',
     texture11: './textures/desk1.jpg',
     texture12: './textures/desk2.jpg',
     texture13:'./textures/desk3.jpg'
    }
  },
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
  materialColour:{
    value:'#32a852'
      },
      material:{
        value:null,
        options:[
          './textures/brick.jpg',
        './textures/brick2.jpg',
         './textures/brick3.jpg',
         './textures/brick4.jpg',
       './textures/brick5.png',
         './textures/brick6.png',
          './textures/brick7.png',
          './textures/brick8.png',
         './textures/brick9.jpg',
         './textures/brick10.jpg',
          './textures/desk1.jpg',
          './textures/desk2.jpg',
          './textures/desk3.jpg'
        ]
      },
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
  materialColour:{
    value:'#9673ff'
      },
      material:{
        value:null,
        options:[
          './textures/brick.jpg',
        './textures/brick2.jpg',
         './textures/brick3.jpg',
         './textures/brick4.jpg',
       './textures/brick5.png',
         './textures/brick6.png',
          './textures/brick7.png',
          './textures/brick8.png',
         './textures/brick9.jpg',
         './textures/brick10.jpg',
          './textures/desk1.jpg',
          './textures/desk2.jpg',
          './textures/desk3.jpg'
        ]
      },
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
  materialColour:{
    value:'#ff4fe2'
      },
      material:{
        value:null,
        options:[
          './textures/brick.jpg',
        './textures/brick2.jpg',
         './textures/brick3.jpg',
         './textures/brick4.jpg',
       './textures/brick5.png',
         './textures/brick6.png',
          './textures/brick7.png',
          './textures/brick8.png',
         './textures/brick9.jpg',
         './textures/brick10.jpg',
          './textures/desk1.jpg',
          './textures/desk2.jpg',
          './textures/desk3.jpg'
        ],
       
      },
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
  materialColour:{
    value:'#72ff4f'
      },
      material:{
        value:null,
        options:[
          './textures/brick.jpg',
        './textures/brick2.jpg',
         './textures/brick3.jpg',
         './textures/brick4.jpg',
       './textures/brick5.png',
         './textures/brick6.png',
          './textures/brick7.png',
          './textures/brick8.png',
         './textures/brick9.jpg',
         './textures/brick10.jpg',
          './textures/desk1.jpg',
          './textures/desk2.jpg',
          './textures/desk3.jpg'
        ]
      },
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

const addNewWall= ()=>{
  setAdditionalWalls([...additionalWalls,   {
    id: `wall${Math.random()}index${additionalWalls.length}`,
    mesh:{
    map: {
      texturePath: null,
    },
    colour: 'green',
    position:{x:0, y:0.5, z:0},
    scale: {x:1, y:1, z:1},
    rotation: {x:0, y:1.57, z:0},
    
  }, geometry:{
      width: 1,
      height: 1,
    }},])
}


  return (
      <div className='w-full h-full flex'>
          <div className="flex h-screen max-w-16 rounded-r-xl w-full p-4 flex-col gap-6 items-center bg-purple text-white">
              <button onClick={()=>setFurnitureDrawer(!furnitureDrawer)}>
                  <BiSolidCartAdd className="text-2xl"/>
              </button>
              <button onClick={()=>set3dObject({
                group:{
                  position:groupRef.current!.position,
                  martix:groupRef.current!.matrix,
                  matrixWorld:groupRef.current!.matrixWorld,
                  scale:groupRef.current!.scale,
                  rotation: groupRef.current!.rotation
                },
                floor:{
                  mesh:{
                    position:floorRef.current!.position,
                    scale: floorRef.current!.scale,
                    matrixWorld: floorRef.current!.matrixWorld,
                    matrix: floorRef.current!.matrix,
                    rotation: floorRef.current!.rotation,
                    uuid:floorRef.current!.uuid,
                    id:floorRef.current!.id,
                    material:floorRef.current!.material,
                    map: {
                      object:floorMaterialRef.current!.map,
                      texturePath: levaControls.material,
                    },
                    colour: levaControls.materialColour,
                  },
                  geometry:{
                    width: floorPlaneRef.current!.parameters.width,
                    height: floorPlaneRef.current!.parameters.height,
                    normalArrayAttribute: floorPlaneRef.current!.attributes.normal.array,
                    positionArrayAttribute: floorPlaneRef.current!.attributes.position.array,
                    uvArrayAttribute: floorPlaneRef.current!.attributes.uv.array,
                    uuid:floorPlaneRef.current!.uuid,
                    morph: floorPlaneRef.current!.morphAttributes,
                    id: floorPlaneRef.current!.id
                  }
                },
                walls:[
                {mesh:{
                  position:wall1Ref.current!.position,
                  scale: wall1Ref.current!.scale,
                  matrixWorld: wall1Ref.current!.matrixWorld,
                  matrix: wall1Ref.current!.matrix,
                  rotation: wall1Ref.current!.rotation,
                  uuid:wall1Ref.current!.uuid,
                  id:wall1Ref.current!.id,
                  material: wall1Ref.current!.material,
                  colour: firstWallControls.materialColour,
                  map: {
                    texturePath: firstWallControls.material,
                  },
                }, geometry:{
                    width: wall1PlaneRef.current!.parameters.width,
                    height: wall1PlaneRef.current!.parameters.height,
                    normalArrayAttribute: wall1PlaneRef.current!.attributes.normal.array,
                    positionArrayAttribute: wall1PlaneRef.current!.attributes.position.array,
                    uvArrayAttribute: wall1PlaneRef.current!.attributes.uv.array,
                    morph: wall1PlaneRef.current!.morphAttributes,
                    uuid:wall1PlaneRef.current!.uuid,
                    id: wall1PlaneRef.current!.id
                  }}, 
                  {mesh:{
                    position:wall2Ref.current!.position,
                    scale: wall2Ref.current!.scale,
                    matrixWorld: wall2Ref.current!.matrixWorld,
                    matrix: wall2Ref.current!.matrix,
                    rotation: wall2Ref.current!.rotation,
                    uuid:wall2Ref.current!.uuid,
                    id:wall2Ref.current!.id,
                    material: wall2Ref.current!.material,
                    map: {
                      texturePath: secondWallControls.material,
                    },
                    colour: secondWallControls.materialColour,
                  }, geometry:{
                      width: wall2PlaneRef.current!.parameters.width,
                      height: wall2PlaneRef.current!.parameters.height,
                      normalArrayAttribute: wall2PlaneRef.current!.attributes.normal.array,
                      positionArrayAttribute: wall2PlaneRef.current!.attributes.position.array,
                      uvArrayAttribute: wall2PlaneRef.current!.attributes.uv.array,
                      morph: wall2PlaneRef.current!.morphAttributes,
                      uuid:wall2PlaneRef.current!.uuid,
                      id: wall2PlaneRef.current!.id
                    }}, 
                    {mesh:{
                      map: {
                        texturePath: thirdWallContols.material,
                      },
                      colour: thirdWallContols.materialColour,
                      position:wall3Ref.current!.position,
                      scale: wall3Ref.current!.scale,
                      matrixWorld: wall3Ref.current!.matrixWorld,
                      matrix: wall3Ref.current!.matrix,
                      rotation: wall3Ref.current!.rotation,
                      uuid:wall3Ref.current!.uuid,
                      id:wall3Ref.current!.id,
                      material: wall3Ref.current!.material,
                      
                    }, geometry:{
                        width: wall3PlaneRef.current!.parameters.width,
                        height: wall3PlaneRef.current!.parameters.height,
                        normalArrayAttribute: wall3PlaneRef.current!.attributes.normal.array,
                        positionArrayAttribute: wall3PlaneRef.current!.attributes.position.array,
                        uvArrayAttribute: wall3PlaneRef.current!.attributes.uv.array,
                        uuid:wall3PlaneRef.current!.uuid,
                        morph: wall3PlaneRef.current!.morphAttributes,
                        id: wall3PlaneRef.current!.id
                      }}, 
                      {mesh:{
                        map: {
                          texturePath: fourthWallControls.material,
                        },
                        colour: fourthWallControls.materialColour,
                        position:wall4Ref.current!.position,
                        scale: wall4Ref.current!.scale,
                        matrixWorld: wall4Ref.current!.matrixWorld,
                        matrix: wall4Ref.current!.matrix,
                        rotation: wall4Ref.current!.rotation,
                        uuid:wall4Ref.current!.uuid,
                        id:wall4Ref.current!.id,
                        material: wall4Ref.current!.material,
                      }, geometry:{
                          width: wall4PlaneRef.current!.parameters.width,
                          morph: wall4PlaneRef.current!.morphAttributes,
                          height: wall4PlaneRef.current!.parameters.height,
                          normalArrayAttribute: wall4PlaneRef.current!.attributes.normal.array,
                          positionArrayAttribute: wall4PlaneRef.current!.attributes.position.array,
                          uvArrayAttribute: wall4PlaneRef.current!.attributes.uv.array,
                          uuid:wall4PlaneRef.current!.uuid,
                          id: wall4PlaneRef.current!.id,
                        }}, 
                ],
                objects:gltfObjects,
                additionalWalls
              })}>
                <RiSave2Fill className="text-2xl"/>
              </button>
              <button onClick={moveForward}>
                <GiExitDoor className='text-2xl text-red-500'/>
              </button>
          </div>

<FurnitureDrawer addModel={selectModels} isOpen={furnitureDrawer} close={()=>setFurnitureDrawer(false)}/>

<ElementManagment removeObject={deleteModel} saveChanges={saveChanges} objectToEdit={objectToEdit}/>


          <div className='w-full h-screen relative top-0 left-0'>        
          <Canvas>
    
    <CameraControls ref={cameraControlsRef} enabled={true}/>
              <ambientLight />

<Grid sectionColor={'#703BF7'} cellColor={'#703BF7'} cellSize={0.05} args={[20, 20]} sectionSize={0.5} scale={2} position-y={-0.5} />

<group ref={groupRef}>
    
   {models!.length > 0 && models?.map((item, i)=>(<GltfObject id={item.id} setObjectToEdit={selectToEdit} position={item.position} key={i} gltfObjectUrl={item.gltfObjectUrl} scale={item.scale} />))}
    
<Wall1 wallMaterialRef={wall1MaterialRef} wallRef={wall1Ref} wallPlaneRef={wall1PlaneRef} wallControls={firstWallControls} levaControls={levaControls}/>

<Wall2 wallMaterialRef={wall2MaterialRef} wallControls={secondWallControls} levaControls={levaControls} wallRef={wall2Ref} wallPlaneRef={wall2PlaneRef}/>

<Wall3 wallMaterialRef={wall3MaterialRef} wallControls={thirdWallContols} levaControls={levaControls} wallRef={wall3Ref} wallPlaneRef={wall3PlaneRef}/>
    
<Wall4 wallMaterialRef={wall4MaterialRef} levaControls={levaControls} wallControls={fourthWallControls} wallPlaneRef={wall4PlaneRef} wallRef={wall4Ref}/>
{additionalWalls.length > 0 && additionalWalls.map((item, i)=>(<AdditionalWall id={item.id} selectWallToEdit={selectToEdit} width={item.geometry.width} height={item.geometry.height} rotation={item.mesh.rotation} scale={item.mesh.scale} position={item.mesh.position} wallColour={item.mesh.colour} key={i}/>))}

<Floor floorMaterialRef={floorMaterialRef} levaControls={levaControls} floorRef={floorRef} floorPlaneRef={floorPlaneRef}/>
</group>

          </Canvas>
          <div className="absolute bottom-0 left-0 m-12 flex gap-6 items-center">
          <button onClick={moveToBasePosition} className="bg-purple p-3 rounded-lg h-fit">
          <FaHome size={20} className="text-white"/>
        </button>
        <div className="flex flex-col items-center gap-2">
        <button onClick={moveCameraForward} className="bg-purple p-3 text-white rounded-lg w-fit">
          <FaArrowUp fontSize={14}/>
        </button>
        <div className="flex gap-2">
        <button onClick={moveCameraLeft} className="bg-purple p-3 text-white rounded-lg">
          <FaArrowLeft fontSize={14}/>
        </button>
        <button onClick={moveCameraBack} className="bg-purple p-3 text-white rounded-lg">
          <FaArrowDown fontSize={14}/>
        </button>
        <button onClick={moveCameraRight} className="bg-purple p-3 text-white rounded-lg">
          <FaArrowRight fontSize={14}/>
        </button>
        </div>

        </div>
        <button className='bg-purple p-3 rounded-lg'>
<GiBrickWall onClick={addNewWall} className="text-white"/>
        </button>
          </div>
    </div>

    </div>
  )
}

export default DimensionalPlanner
