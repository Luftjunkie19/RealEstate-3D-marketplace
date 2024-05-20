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
    id:string
}

function AdditionalWall({wallColour, selectWallToEdit, rotation, position, scale, width, height, id}: Props) {
const wallMeshRef=useRef<THREE.Mesh>(null);
const wallGeomertyRef = useRef<THREE.PlaneGeometry>(null);


  return (
   <mesh onClick={()=>selectWallToEdit({...wallMeshRef.current, id})} ref={wallMeshRef} scale={[scale.x, scale.y, scale.z]} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
    <planeGeometry args={[width, height]} ref={wallGeomertyRef} />
    <meshBasicMaterial side={THREE.DoubleSide} color={wallColour}/>
   </mesh>
  )
}

export default AdditionalWall