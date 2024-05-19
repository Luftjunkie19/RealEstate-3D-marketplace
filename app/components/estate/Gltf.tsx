import {useEffect, useRef} from 'react';

import { Gltf, TransformControls } from '@react-three/drei'
import React from 'react'
import { Object3D, Object3DEventMap, Vector3 } from 'three'
import { useControls } from 'leva';

export type Gltf3dPresentationObject = {
    gltfObjectUrl:string,
    scale:{x:number, y:number, z:number},
    position:{x:number, y:number, z:number},
    rotation:{_x:number, _y:number, _z:number}
}



function GltfObject({scale, gltfObjectUrl, position, rotation}: Gltf3dPresentationObject) {
  return (
  
        <Gltf 
        src={gltfObjectUrl} 
        scale-x={scale.x} scale-y={scale.y} scale-z={scale.z} rotation-x={rotation._x} rotation-y={rotation._y} rotation-z={rotation._z} position-x={position.x} position-y={ position.y} position-z={ position.z} castShadow receiveShadow/>
  )
}

export default GltfObject