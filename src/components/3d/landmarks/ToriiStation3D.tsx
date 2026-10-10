import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ToriiGate3D } from '../ToriiGate3D'

interface ToriiStation3DProps {
  activeChamber: number
  isEntered?: boolean
  isWarping?: boolean
}

export function ToriiStation3D({
  activeChamber,
  isEntered = false,
  isWarping = false,
}: ToriiStation3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    let targetZ = -0.8
    let targetScale = 1.0
    let targetY = 0.0

    if (isWarping) {
      // Warp speed dive: Torii gate flies backward past the camera!
      targetZ = 14.0
      targetScale = 1.8
      targetY = 0.2
    } else if (isEntered) {
      // Once entered, Torii gate remains behind camera in the distance
      targetZ = 16.0
      targetScale = 0.001
      targetY = -1.0
    } else if (activeChamber !== 0) {
      targetZ = 3.5
      targetScale = 0.001
      targetY = -1.0
    }

    const dampSpeed = isWarping ? 8 : 4

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, dampSpeed, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, dampSpeed, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, dampSpeed, delta)
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, dampSpeed, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, dampSpeed, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05
  })

  return (
    <group ref={groupRef} position={[0, 0, -0.8]}>
      <ToriiGate3D />
    </group>
  )
}
