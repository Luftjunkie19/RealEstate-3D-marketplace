/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import * as THREE from 'three';

import { useLoader } from '@react-three/fiber';

type Props = {
    wall:any
}

function Wall({wall}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loadMap= wall.mesh.map.texturePath ? useLoader(THREE.TextureLoader, wall.mesh.map.texturePath as string) : null;     
  return (
   <mesh scale-y={wall.mesh.scale.y} scale-z={wall.mesh.scale.z} scale-x={wall.mesh.scale.x} rotation-z={wall.mesh.rotation._z} rotation-y={wall.mesh.rotation._y} rotation-x={wall.mesh.rotation._x} position-z={wall.mesh.position.z} position-y={wall.mesh.position.y} position-x={wall.mesh.position.x} key={wall.uuid}>
  <planeGeometry args={[wall.geometry.width, wall.geometry.height, 1, 1]} />
<meshStandardMaterial side={THREE.DoubleSide} color={wall.mesh.material.color} />
{ loadMap && <meshStandardMaterial map={loadMap as THREE.Texture} side={THREE.DoubleSide} color={wall.mesh.material.color} />}
</mesh>
  )
}

export default Wall