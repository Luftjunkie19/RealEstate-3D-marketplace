/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import * as THREE from 'three';

import { useTexture } from '@react-three/drei';

type Props = {
    wall:any
}

function Wall({wall}: Props) {
 const loadMap= wall.mesh.map?.texturePath ? useTexture({map:wall.mesh.map.texturePath}) : null;     

  return (
   <mesh scale-y={wall.mesh.scale.y} scale-z={wall.mesh.scale.z} scale-x={wall.mesh.scale.x} rotation-z={wall.mesh.rotation._z} rotation-y={wall.mesh.rotation._y} rotation-x={wall.mesh.rotation._x} position-z={wall.mesh.position.z} position-y={wall.mesh.position.y} position-x={wall.mesh.position.x} key={wall.uuid}>
  <planeGeometry args={[wall.geometry.width, wall.geometry.height, 1, 1]} />
<meshStandardMaterial side={THREE.DoubleSide} color={wall.mesh.material.color} />
{ loadMap && <meshStandardMaterial {...loadMap} side={THREE.DoubleSide} color={wall.mesh.material.color} />}
</mesh>
  )
}

export default Wall