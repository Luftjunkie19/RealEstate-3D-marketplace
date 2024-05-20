import {useEffect, useRef} from 'react';

import { Gltf, TransformControls } from '@react-three/drei'
import React from 'react'
import { Object3D, Object3DEventMap, Vector3 } from 'three'
import { useControls } from 'leva';

export type Gltf3dObject = {
    gltfObjectUrl:string,
    scale:number,
    position:[number, number, number],
    setObjectToEdit:(obj:any) => void,
    id:string,
}



function GltfObject({scale, gltfObjectUrl, position, setObjectToEdit, id}: Gltf3dObject) {
  const gltfObjectRef=useRef<Object3D<Object3DEventMap>>(null);

  return (
    
        <Gltf 
       onClick={()=>setObjectToEdit({...gltfObjectRef.current, gltfObjectUrl, id})} 
        ref={gltfObjectRef} 
        src={gltfObjectUrl} 
        scale={scale} position={position} castShadow receiveShadow/>
   
  )
}

export default GltfObject