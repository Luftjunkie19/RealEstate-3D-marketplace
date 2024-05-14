/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/assets/furniture/kitchen_sink.glb 
Author: konoki (https://sketchfab.com/konoki-kon)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/kitchen-sink-38da0318c8ae4150b460c84d47360283
Title: Kitchen sink
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/kitchen_sink.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.cabinet} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Pans_pots} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.towel_sink} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.frame_sink_tubes_details} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.frame_sink_tubes_details} />
      </group>
    </group>
  )
}

useGLTF.preload('/kitchen_sink.glb')
