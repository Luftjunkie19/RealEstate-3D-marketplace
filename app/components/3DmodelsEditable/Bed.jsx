/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/assets/furniture/bed.glb 
Author: flyaway0701 (https://sketchfab.com/flyaway0701)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/bed-ae4c7f7805cb4c3d9c72e79d958a3fb3
Title: Bed
*/

import React from 'react';

import { useGLTF, PivotControls, DragControls, TransformControls} from '@react-three/drei';

export function BedModel(props) {
  const { nodes, materials } = useGLTF('/bed.glb')
  return (

  
    <group {...props} scale={0.25} dispose={null}>
      <group scale={0.01}>
        <group position={[-63.764, 0, 12.53]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.1}>
          <mesh geometry={nodes.Bed01_06_M_Bed01_06_0.geometry} material={materials.M_Bed01_06} position={[-5.921, -624.888, 67.906]} />
        </group>
        <mesh geometry={nodes.Bed01_01_M_Bed01_01_0.geometry} material={materials.M_Bed01_01} position={[0.463, 0, 5.585]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.1} />
        <group position={[-86.337, 0, 10.565]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.1}>
          <mesh geometry={nodes.Bed01_02_M_Bed01_02_0.geometry} material={materials.M_Bed01_02} position={[4.083, -857.115, 60.332]} />
        </group>
        <group position={[-0.384, 0, 8.169]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.1}>
          <mesh geometry={nodes.Bed01_05_M_Bed01_05_0.geometry} material={materials.M_Bed01_05} position={[0, 0, 65.614]} />
        </group>
        <group position={[0.249, 0, 4.777]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.1}>
          <mesh geometry={nodes.Bed01_04_M_Bed01_04_0.geometry} material={materials.M_Bed01_04} position={[0, 0, 82.324]} />
        </group>
        <group position={[32.571, 0, -6.539]} rotation={[2.855, 1.445, -3.024]} scale={[115, 120, 100]}>
          <mesh geometry={nodes.Bed01_07_M_Bed01_07_0.geometry} material={materials.M_Bed01_07} position={[-0.067, 0.074, -0.314]} />
        </group>
        <group position={[0.249, 0, 4.777]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.1}>
          <mesh geometry={nodes.Bed01_03_M_Bed01_03_0.geometry} material={materials.M_Bed01_03} position={[0, 0, 82.324]} />
        </group>
      </group>
    </group>
  

  )
}

useGLTF.preload('/bed.glb')
