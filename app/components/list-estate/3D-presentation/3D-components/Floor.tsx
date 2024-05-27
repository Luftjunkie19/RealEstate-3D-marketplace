

import { useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import React from 'react'
import * as THREE from 'three';

type Props = {
  levaControls:{
    materialColour: string;
    material: string | null;
    floorXScale: number;
    floorYScale: number;
    floorZScale: number;
    floorPosition: {
        x: number;
        y: number;
        z: number;
    };
},
floorMaterialRef:React.Ref<THREE.MeshBasicMaterial>,
  floorRef:React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>,
  floorPlaneRef:React.RefObject<THREE.PlaneGeometry>}

function Floor({floorRef, floorPlaneRef, levaControls, floorMaterialRef}: Props) {
 
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const loadMap= levaControls.material ? useLoader(THREE.TextureLoader, levaControls.material as string) : null;     

  return (
<mesh ref={floorRef} rotation-x={-Math.PI / 2} onClick={()=>console.log(loadMap, floorMaterialRef)}>
                  <planeGeometry ref={floorPlaneRef} args={[levaControls.floorXScale, levaControls.floorYScale, levaControls.floorZScale]} />
                  <meshBasicMaterial ref={floorMaterialRef} side={THREE.DoubleSide} color={levaControls.materialColour} />
                 { loadMap && <meshBasicMaterial map={loadMap && loadMap} ref={floorMaterialRef} side={THREE.DoubleSide} color={levaControls.materialColour} />}
              </mesh>
  )
}

export default Floor