import { Gltf } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import * as THREE from 'three';
type Props = {}

function RotatingObject({}: Props) {

const gltfReference=useRef<THREE.Object3D<THREE.Object3DEventMap>>(null);

useFrame((state, delta)=>{
if(gltfReference.current){
    gltfReference.current.rotateY(delta);
}
})


  return (
     
    <Gltf scale={0.85} ref={gltfReference} src="/simple_real_estate.glb" />
  )
}

export default RotatingObject