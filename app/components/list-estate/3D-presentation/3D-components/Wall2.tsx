import { Color, useLoader } from '@react-three/fiber';
import React from 'react'
import * as THREE from 'three';
type Props = {
    wallRef:React.Ref<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>, 
    wallPlaneRef:React.Ref<THREE.PlaneGeometry>,
    wallMaterialRef:React.Ref<THREE.MeshBasicMaterial>,
    wallControls:{
    wallYScale: number;
    material: string | null;
    materialColour: string;
    wallRotation: {
        x: number;
        y: number;
        z: number;
    };
    wallPosition: {
        x: number;
        y: number;
        z: number;
    },},
levaControls:{
  material: string;
  materialColour: string;
  floorPosition: {
      x: number;
      y: number;
      z: number;
  };
  floorXScale: number;
  floorYScale: number;
  floorZScale: number;
},
}

function Wall2({wallRef, wallPlaneRef, wallControls, levaControls, wallMaterialRef}: Props) {
   // eslint-disable-next-line react-hooks/rules-of-hooks
 const loadMap= wallControls.material ? useLoader(THREE.TextureLoader, wallControls.material as string) : null;     
  return (
    <mesh ref={wallRef} scale-x={levaControls.floorYScale} rotation-y={1.57} rotation-z={wallControls.wallRotation.z} rotation-x={wallControls.wallRotation.x} position-x={levaControls.floorXScale / 2} position-y={wallControls.wallYScale / 2} position-z={wallControls.wallPosition.z} >
    <planeGeometry ref={wallPlaneRef}  />
    <meshBasicMaterial side={THREE.DoubleSide} color={wallControls.materialColour} />
     { loadMap && <meshBasicMaterial ref={wallMaterialRef} map={loadMap && loadMap} side={THREE.DoubleSide} color={wallControls.materialColour} />}
</mesh>

  )
}

export default Wall2