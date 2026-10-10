import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HologramStation3DProps {
  activeChamber: number
}

export function HologramStation3D({ activeChamber }: HologramStation3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const beamRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 2
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? -1.8 : -4.5

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.8
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.5
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 1.2

    if (beamRef.current) {
      const pulse = 1.0 + Math.sin(time * 3) * 0.1
      beamRef.current.scale.y = pulse
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.28 + Math.sin(time * 2) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.8, 0]} rotation={[0.4, 0, 0]} scale={0.001} visible={false}>
      {/* Outer Ring */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.56, 64]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* Mid Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.85, 48]} />
        <meshBasicMaterial color="#ff0055" side={THREE.DoubleSide} transparent opacity={0.75} />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.05, 32]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.85} />
      </mesh>

      {/* Center Pedestal Core Cylinder */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.75, 0.9, 0.25, 32]} />
        <meshStandardMaterial color="#070b14" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Vertical Hologram Light Beam (Cone/Cylinder) */}
      <mesh ref={beamRef} position={[0, 2.0, 0]}>
        <cylinderGeometry args={[2.0, 0.8, 4.0, 32, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point Light from Base */}
      <pointLight color="#00f0ff" intensity={3.5} distance={8} />
      <pointLight color="#ff0055" intensity={2.0} distance={5} />
    </group>
  )
}
