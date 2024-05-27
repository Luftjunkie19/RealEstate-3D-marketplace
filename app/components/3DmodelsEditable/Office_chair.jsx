/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/assets/furniture/office_chair.glb 
Author: Maria de Fatima (https://sketchfab.com/kafezinn)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/office-chair-3d2ca8666d4149c383724242a62215ef
Title: Office Chair
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/office_chair.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[-13.802, -19.149, 19.406]} rotation={[0, 0.98, -Math.PI / 2]} scale={100}>
            <mesh geometry={nodes.Circle004_Material003_0.geometry} material={materials['Material.003']} />
            <mesh geometry={nodes.Circle004_Material002_0.geometry} material={materials['Material.002']} />
            <mesh geometry={nodes.Circle004_Material004_0.geometry} material={materials['Material.004']} />
            <mesh geometry={nodes.Circle004_Material001_0.geometry} material={materials['Material.001']} />
            <mesh geometry={nodes.Circle004_Material_0.geometry} material={materials.Material} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/office_chair.glb')