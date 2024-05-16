import { Canvas } from '@react-three/fiber'
import React from 'react'

type Props = {object3D:any}

function EstateCanvas({object3D}: Props) {
  return (
 <Canvas>
<ambientLight/>
 </Canvas>
  )
}

export default EstateCanvas