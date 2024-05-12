/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';

import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
    nodes: {
      Cube007: THREE.Mesh,Cube007_1: THREE.Mesh
      
    }
    materials: {
      MetalBlack: THREE.MeshStandardMaterial,DeskWood: THREE.MeshStandardMaterial
    }
  }

        export default function Model(props: JSX.IntrinsicElements['group']) {
            const group = useRef<THREE.Group>(null);
          const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf') as unknown as GLTFResult
          return (
            <group ref={group} {...props} dispose={null}>
        <group position={[-4.26, 31.74, -0.17,]} scale={1.43} >
<mesh geometry={nodes.Cube007.geometry} material={materials.MetalBlack} />
<mesh geometry={nodes.Cube007_1.geometry} material={materials.DeskWood} />
</group>

            </group>
          )
        }

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf')