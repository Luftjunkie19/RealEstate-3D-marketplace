'use client';
import * as THREE from 'three';
import { Html, OrbitControls, Stage, Text3D } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import React from 'react'
import GltfObject from './Gltf';
import AdditionalWall from './AdditionalWall';
import Wall from './Wall';

type Props = {object3D:any}

function EstateCanvas({object3D}: Props) {
  return (
 <Canvas>
  <OrbitControls/>
<Stage>
  <group rotation-x={object3D.group.rotation.x} rotation-z={object3D.group.rotation.z} rotation-y={object3D.group.rotation.y} position-x={object3D.group.position.x} position-y={object3D.group.position.y} position-z={object3D.group.position.z} scale-z={object3D.group.scale.z} scale-x={object3D.group.scale.x} scale-y={object3D.group.scale.y}>
  <mesh  rotation-x={object3D.floor.mesh.rotation._x} scale-x={object3D.floor.mesh.scale.x} onClick={()=>console.log(object3D)}>
  <planeGeometry  args={[object3D.floor.geometry.width, object3D.floor.geometry.height, 1, 1]} />
  <meshStandardMaterial side={object3D.floor.mesh.material.side === 2 ? THREE.DoubleSide : THREE.FrontSide } color={object3D.floor.color} />
</mesh>

{object3D.walls.map((wall:any, i)=>(<Wall key={i} wall={wall}/>))}

{object3D.objects && object3D.objects.length > 0 && object3D.objects.map((item, i)=>(<GltfObject rotation={item.rotation} scale={item.scale} position={item.position} gltfObjectUrl={item.modelPath} key={i} />))}
{object3D.additionalWalls && object3D.additionalWalls.length > 0 && object3D.additionalWalls.map((item, i)=>(<AdditionalWall width={item.geometry.width} height={item.geometry.height} rotation={item.mesh.rotation} position={item.mesh.position} key={i} scale={item.mesh.scale}/>))}
  </group>
</Stage>
 </Canvas>
  )
}

export default EstateCanvas