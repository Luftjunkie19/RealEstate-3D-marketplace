import { useLoader } from '@react-three/fiber';
import React from 'react'
import * as THREE from 'three';
type Props = {
    rotation:{_x:number, _y:number, _z:number},
    scale:{x:number, y:number, z:number},
    position:{x:number, y:number, z:number},
    width:number,
    height:number,
    colour:string,
    map:{texturePath:string | null | undefined}
}

function AdditionalWall({width, height,map, scale, rotation, position, colour}: Props) {
 
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loadMap= map.texturePath ? useLoader(THREE.TextureLoader, map.texturePath as string) : null;
 
  return (
    <mesh position={[position.x, position.y, position.z]} rotation-x={rotation._x} rotation-y={rotation._y} rotation-z={rotation._z} scale-x={scale.x} scale-y={scale.y} scale-z={scale.z}>
        <planeGeometry args={[width, height]}/>
        <meshBasicMaterial side={2} color={colour}/>
        {loadMap && <meshBasicMaterial map={loadMap} side={2} color={colour}/>}
    </mesh>
  )
}

export default AdditionalWall