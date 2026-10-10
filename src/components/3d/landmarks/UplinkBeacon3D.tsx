import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface UplinkBeacon3DProps {
  activeChamber: number
}

export function UplinkBeacon3D({ activeChamber }: UplinkBeacon3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const beamRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 6
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -4.0

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()

    // Rotate orbiting satellite radar rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5
      ring1Ref.current.rotation.y = time * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.6
      ring2Ref.current.rotation.z = time * 0.4
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.4
      ring3Ref.current.rotation.z = -time * 0.7
    }

    // Pulse transmission beam
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.35 + Math.sin(time * 4) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Central Colossal Laser Uplink Beam */}
      <mesh ref={beamRef} position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.35, 0.7, 12, 32, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Core Intense Laser Core Wire */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 12, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3.5}
        />
      </mesh>

      {/* Orbiting Satellite Gyro Ring 1 */}
      <mesh ref={ring1Ref} position={[0, 1.8, 0]}>
        <torusGeometry args={[1.8, 0.03, 8, 48]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Orbiting Satellite Gyro Ring 2 */}
      <mesh ref={ring2Ref} position={[0, 2.8, 0]}>
        <torusGeometry args={[2.4, 0.025, 8, 48]} />
        <meshStandardMaterial
          color="#ff0055"
          emissive="#ff0055"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Orbiting Satellite Gyro Ring 3 */}
      <mesh ref={ring3Ref} position={[0, 3.8, 0]}>
        <torusGeometry args={[3.0, 0.02, 8, 48]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Uplink Base Emitter Pedestal */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[1.2, 1.6, 0.4, 32]} />
        <meshStandardMaterial color="#080c16" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <torusGeometry args={[1.4, 0.04, 8, 36]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Uplink Beacon Light */}
      <pointLight position={[0, 2.5, 0]} color="#00f0ff" intensity={4.5} distance={12} />
      <pointLight position={[0, 2.5, 0]} color="#ff0055" intensity={3.0} distance={8} />
    </group>
  )
}
