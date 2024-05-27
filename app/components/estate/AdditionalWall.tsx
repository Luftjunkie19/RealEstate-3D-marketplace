import React from 'react'

type Props = {
    rotation:{_x:number, _y:number, _z:number},
    scale:{x:number, y:number, z:number},
    position:{x:number, y:number, z:number},
    width:number,
    height:number,
}

function AdditionalWall({width, height, scale, rotation, position}: Props) {
  return (
    <mesh position={[position.x, position.y, position.z]} rotation-x={rotation._x} rotation-y={rotation._y} rotation-z={rotation._z} scale-x={scale.x} scale-y={scale.y} scale-z={scale.z}>
        <planeGeometry args={[width, height]}/>
        <meshBasicMaterial side={2} color={'red'}/>
    </mesh>
  )
}

export default AdditionalWall