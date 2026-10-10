import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ToriiGate3D } from '../ToriiGate3D'

interface ToriiStation3DProps {
  activeChamber: number
}

export function ToriiStation3D({ activeChamber }: ToriiStation3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 0
    const targetScale = isActive ? 1.0 : 0.001
    const targetZ = isActive ? -0.8 : 3.5 // floats forward/past camera when navigating away
    const targetY = isActive ? 0.0 : -1.0

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05
  })

  return (
    <group ref={groupRef} position={[0, 0, -0.8]}>
      <ToriiGate3D />
    </group>
  )
}
