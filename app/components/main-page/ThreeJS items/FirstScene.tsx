/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-children-prop */
'use client';
import React, { Suspense } from 'react';

import {
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function FirstScene() {
  const object = useGLTF('/simple_real_estate.glb');
    
  return (
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 10, 50] }}>
  <OrbitControls/>
      <ambientLight />

        <Suspense>

          <primitive  object={object.scene} />

      </Suspense>

        

    

   

          
   </Canvas>
  )
}

export default FirstScene