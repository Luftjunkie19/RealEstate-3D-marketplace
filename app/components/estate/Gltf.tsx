import {useEffect, useRef} from 'react';

import { Gltf, TransformControls } from '@react-three/drei'
import React from 'react'
import { Object3D, Object3DEventMap, Vector3 } from 'three'
import { useControls } from 'leva';

export type Gltf3dPresentationObject = {
    gltfObjectUrl:string,
    scale:{x:number, y:number, z:number},
    position:{x:number, y:number, z:number},
}



function GltfObject({scale, gltfObjectUrl, position}: Gltf3dPresentationObject) {
  return (
  
        <Gltf 
        src={gltfObjectUrl} 
        scale-x={scale.x} scale-y={scale.y} scale-z={scale.z} position={[position.x, position.y, position.z]} castShadow receiveShadow/>
  )
}

export default GltfObject