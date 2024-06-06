import { useLoader } from '@react-three/fiber';
import React, { useRef } from 'react'
import * as THREE from 'three';

type Props = {
    wallColour:string, 
    rotation:{x:number, y:number, z:number},
    position:{x:number, y:number, z:number},
    scale:{x:number, y:number, z:number},
    width:number,
    height:number,
    selectWallToEdit: (obj:any)=>void, 
    id:string,
    wallMap:any,
}

function AdditionalWall({wallColour, selectWallToEdit, rotation, position, scale, width, height, id, wallMap}: Props) {
const wallMeshRef=useRef<THREE.Mesh>(null);
const wallGeomertyRef = useRef<THREE.PlaneGeometry>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loadMap= wallMap.texturePath ? useLoader(THREE.TextureLoader, wallMap.texturePath as string) : null; 

  return (
   <mesh onClick={()=>{
    selectWallToEdit({...wallMeshRef.current, map:wallMap, colour:wallColour, geometry:{...wallGeomertyRef.current?.parameters}, id});
    console.log({...wallMeshRef.current,map:wallMap, colour:wallColour, geometry:{...wallGeomertyRef.current?.parameters}});
    }} ref={wallMeshRef} scale={[scale.x, scale.y, scale.z]} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
    <planeGeometry args={[width, height]} ref={wallGeomertyRef} />
    <meshBasicMaterial side={THREE.DoubleSide} color={wallColour}/>
    {loadMap &&  <meshBasicMaterial side={THREE.DoubleSide} color={wallColour} map={loadMap}/>}
   </mesh>
  )
}

export default AdditionalWall