'use client';
import React, {
  Suspense,
  useRef,
} from 'react';

import {
  Gltf,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function FirstScene() {

  const gltfReference=useRef<any>(null);

 
    
  return (
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 10, 50] }}>
  <OrbitControls/>
      <ambientLight />

        <Suspense>
 
        <Gltf src="/simple_real_estate.glb" ref={gltfReference}/>

      </Suspense>

        

    

   

          
   </Canvas>
  )
}

export default FirstScene