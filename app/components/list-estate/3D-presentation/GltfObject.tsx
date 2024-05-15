import { Gltf, TransformControls } from '@react-three/drei'
import React from 'react'
import { Vector3 } from 'three'

export type Gltf3dObject = {
    gltfObjectUrl:string,
    scale:number,
    position:[number, number, number],
}

function GltfObject({scale, gltfObjectUrl, position}: Gltf3dObject) {
  return (
    <TransformControls>
        <Gltf src={gltfObjectUrl} scale={scale} position={position} castShadow receiveShadow/>
    </TransformControls>
  )
}

export default GltfObject