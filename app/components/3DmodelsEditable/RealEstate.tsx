/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/assets/realEstate.gltf --types 
Author: sucholudek (https://sketchfab.com/sucholudek)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/simple-real-estate-10dd84237356440eba59e16554f42359
Title: Simple Real Estate
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['B_13_-_Szyby_0']: THREE.Mesh
    ['B_14_-_Futryny1_0']: THREE.Mesh
    ['B_03_-_Tynk3_0']: THREE.Mesh
    ['B_01_-_Tynk1_0']: THREE.Mesh
    ['B_04_-_Tynk4_0']: THREE.Mesh
    ['B_28_-_Use4_0']: THREE.Mesh
    ['B_30_-_Use6_0']: THREE.Mesh
    ['B_29_-_Use5_0']: THREE.Mesh
    ['B_17_-_MetalCiemny1_0']: THREE.Mesh
    ['B_02_-_Tynk2_0']: THREE.Mesh
    ['B_26_-_Use2_0']: THREE.Mesh
    ['B_27_-_Use3_0']: THREE.Mesh
    ['B_25_-_Use1_0']: THREE.Mesh
  }
  materials: {
    ['13_-_Szyby']: THREE.MeshStandardMaterial
    ['14_-_Futryny1']: THREE.MeshStandardMaterial
    ['03_-_Tynk3']: THREE.MeshStandardMaterial
    ['01_-_Tynk1']: THREE.MeshStandardMaterial
    ['04_-_Tynk4']: THREE.MeshStandardMaterial
    ['28_-_Use4']: THREE.MeshStandardMaterial
    ['30_-_Use6']: THREE.MeshStandardMaterial
    ['29_-_Use5']: THREE.MeshStandardMaterial
    ['17_-_MetalCiemny1']: THREE.MeshStandardMaterial
    ['02_-_Tynk2']: THREE.MeshStandardMaterial
    ['26_-_Use2']: THREE.MeshStandardMaterial
    ['27_-_Use3']: THREE.MeshStandardMaterial
    ['25_-_Use1']: THREE.MeshPhysicalMaterial
  }
  animations: GLTFAction[]
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/realEstate.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.022}>
        <group position={[0, 275.1, 0]}>
          <mesh geometry={nodes['B_13_-_Szyby_0'].geometry} material={materials['13_-_Szyby']} />
          <mesh geometry={nodes['B_14_-_Futryny1_0'].geometry} material={materials['14_-_Futryny1']} />
          <mesh geometry={nodes['B_03_-_Tynk3_0'].geometry} material={materials['03_-_Tynk3']} />
          <mesh geometry={nodes['B_01_-_Tynk1_0'].geometry} material={materials['01_-_Tynk1']} />
          <mesh geometry={nodes['B_04_-_Tynk4_0'].geometry} material={materials['04_-_Tynk4']} />
          <mesh geometry={nodes['B_28_-_Use4_0'].geometry} material={materials['28_-_Use4']} />
          <mesh geometry={nodes['B_30_-_Use6_0'].geometry} material={materials['30_-_Use6']} />
          <mesh geometry={nodes['B_29_-_Use5_0'].geometry} material={materials['29_-_Use5']} />
          <mesh geometry={nodes['B_17_-_MetalCiemny1_0'].geometry} material={materials['17_-_MetalCiemny1']} />
          <mesh geometry={nodes['B_02_-_Tynk2_0'].geometry} material={materials['02_-_Tynk2']} />
          <mesh geometry={nodes['B_26_-_Use2_0'].geometry} material={materials['26_-_Use2']} />
          <mesh geometry={nodes['B_27_-_Use3_0'].geometry} material={materials['27_-_Use3']} />
          <mesh geometry={nodes['B_25_-_Use1_0'].geometry} material={materials['25_-_Use1']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/realEstate.gltf')
