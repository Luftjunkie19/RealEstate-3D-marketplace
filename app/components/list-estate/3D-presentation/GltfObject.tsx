import {useEffect, useRef} from 'react';

import { Gltf, TransformControls } from '@react-three/drei'
import React from 'react'
import { Object3D, Object3DEventMap, Vector3 } from 'three'
import { useControls } from 'leva';

export type Gltf3dObject = {
    gltfObjectUrl:string,
    scale:number,
    position:[number, number, number],
    setObjectToEdit:(obj:any) => void
}



function GltfObject({scale, gltfObjectUrl, position, setObjectToEdit}: Gltf3dObject) {
  const gltfObjectRef=useRef<Object3D<Object3DEventMap>>(null);

  return (
    <TransformControls  
    object={gltfObjectRef.current as Object3D<Object3DEventMap>} mode="translate" showX showZ showY>
        <Gltf 
     
       onClick={()=>setObjectToEdit({...gltfObjectRef.current, gltfObjectUrl})} 
        ref={gltfObjectRef} 
        src={gltfObjectUrl} 
        scale={scale} position={position} castShadow receiveShadow/>
    </TransformControls>
  )
}

export default GltfObject