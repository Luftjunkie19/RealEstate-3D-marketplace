import { useLoader } from '@react-three/fiber';
import React from 'react'
import * as THREE from 'three';
type Props = {
    wallRef:React.Ref<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>, 
    wallPlaneRef:React.Ref<THREE.PlaneGeometry>,
    wallMaterialRef:React.Ref<THREE.MeshBasicMaterial>,
    wallControls:{
    wallZScale: any;
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


function Wall4({wallRef, wallControls,wallPlaneRef, levaControls, wallMaterialRef}: Props) {
   // eslint-disable-next-line react-hooks/rules-of-hooks
 const loadMap= wallControls.material ? useLoader(THREE.TextureLoader, wallControls.material as string) : null;     
  return (
    <mesh ref={wallRef} rotation-x={wallControls.wallRotation.x} rotation-y={wallControls.wallRotation.y} rotation-z={wallControls.wallRotation.z} scale-z={wallControls.wallZScale} scale-y={wallControls.wallYScale}  scale-x={levaControls.floorXScale} position-x={wallControls.wallPosition.x} position-z={levaControls.floorYScale / 2} position-y={wallControls.wallPosition.y}>
    <planeGeometry ref={wallPlaneRef} />
    <meshBasicMaterial side={THREE.DoubleSide} color={wallControls.materialColour} />
     { loadMap && <meshBasicMaterial ref={wallMaterialRef} map={loadMap && loadMap} side={THREE.DoubleSide} color={wallControls.materialColour} />}
</mesh>
  )
}

export default Wall4