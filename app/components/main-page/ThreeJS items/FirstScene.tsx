'use client';
import React, {
  Suspense,
  useRef,
} from 'react';

import {
  Gltf,
  OrbitControls,
  Stage,
  View,
} from '@react-three/drei';
import {
  Canvas,
  useFrame,
} from '@react-three/fiber';
import RotatingObject from './RotatingObject';

function FirstScene() {    
  return (
      <Canvas camera={{position:[-10, 5, 0.5]}}>
<Stage intensity={0.35}>
        <Suspense>

<RotatingObject/>

      </Suspense>
</Stage>
    
   </Canvas>
  )
}

export default FirstScene