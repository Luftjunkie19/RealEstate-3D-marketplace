import { Color, useLoader } from '@react-three/fiber';
import React from 'react'
import * as THREE from 'three';
type Props = {
  wallRef:React.Ref<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>,
  wallMaterialRef:React.Ref<THREE.MeshBasicMaterial>,
   wallPlaneRef:React.Ref<THREE.PlaneGeometry>, wallControls:{
    material: string | null;
    materialColour: Color | undefined;
    wallRotation: {
        x: number;
        y: number;
        z: number;
    };
    wall1YScale: number;
    wall1ZScale: number;
    wall1Position: {
        x: number;
        y: number;
        z: number;
    }, 
}, 
levaControls:any,
}

function Wall1({wallRef, wallPlaneRef, wallControls, levaControls, wallMaterialRef}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
 const loadMap= wallControls.material ? useLoader(THREE.TextureLoader, wallControls.material as string) : null;     
  return (
    <mesh ref={wallRef} rotation-y={1.57} rotation-x={wallControls.wallRotation.x} scale-y={wallControls.wall1YScale} scale-z={wallControls.wall1ZScale} scale-x={levaControls.floorYScale} position-z={wallControls.wall1Position.z} position-y={wallControls.wall1Position.y} position-x={-levaControls.floorXScale / 2} >
    <planeGeometry ref={wallPlaneRef} />
    <meshBasicMaterial side={THREE.DoubleSide} color={wallControls.materialColour} />
     { loadMap && <meshBasicMaterial ref={wallMaterialRef} map={loadMap && loadMap} side={THREE.DoubleSide} color={wallControls.materialColour} />}
</mesh>

  )
}

export default Wall1