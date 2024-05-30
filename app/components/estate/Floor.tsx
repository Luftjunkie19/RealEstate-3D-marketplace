import { useLoader } from '@react-three/fiber';
import React from 'react'
import * as THREE from 'three';
type Props = {object3D:any}

function Floor({object3D}: Props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
 const loadMap= object3D.floor.mesh.map.texturePath ? useLoader(THREE.TextureLoader, object3D.floor.mesh.map.texturePath as string) : null;     
  return (
    <mesh  rotation-x={object3D.floor.mesh.rotation._x} scale-x={object3D.floor.mesh.scale.x} onClick={()=>console.log(object3D)}>
  <planeGeometry  args={[object3D.floor.geometry.width, object3D.floor.geometry.height, 1, 1]} />
  <meshStandardMaterial side={object3D.floor.mesh.material.side === 2 ? THREE.DoubleSide : THREE.FrontSide } color={object3D.floor.color} />
{loadMap &&  <meshStandardMaterial map={loadMap && loadMap} side={object3D.floor.mesh.material.side === 2 ? THREE.DoubleSide : THREE.FrontSide } color={object3D.floor.color} />}
</mesh>
  )
}

export default Floor