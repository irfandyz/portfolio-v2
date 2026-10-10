import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NeuralLattice3DProps {
  activeChamber: number
}

export function NeuralLattice3D({ activeChamber }: NeuralLattice3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const leftNodeRef = useRef<THREE.Mesh>(null)
  const rightNodeRef = useRef<THREE.Mesh>(null)
  const leftRingRef = useRef<THREE.Mesh>(null)
  const rightRingRef = useRef<THREE.Mesh>(null)
  const pulseRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 4
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -3.5

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()

    if (leftNodeRef.current) {
      leftNodeRef.current.rotation.x = time * 0.6
      leftNodeRef.current.rotation.y = time * 0.8
    }
    if (rightNodeRef.current) {
      rightNodeRef.current.rotation.x = -time * 0.6
      rightNodeRef.current.rotation.y = time * 0.7
    }
    if (leftRingRef.current) leftRingRef.current.rotation.z = time * 0.5
    if (rightRingRef.current) rightRingRef.current.rotation.z = -time * 0.5

    // Data pulse oscillating between left and right
    if (pulseRef.current) {
      pulseRef.current.position.x = Math.sin(time * 2.5) * 3.2
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* === LEFT NODE: Universitas CIC (Higher Education) === */}
      <group position={[-3.2, 0.4, 0]}>
        <mesh ref={leftNodeRef}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
        <mesh scale={[1.25, 1.25, 1.25]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.6} />
        </mesh>
        <mesh ref={leftRingRef}>
          <torusGeometry args={[1.1, 0.02, 8, 36]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <pointLight color="#00f0ff" intensity={3.0} distance={6} />
      </group>

      {/* === RIGHT NODE: SMK Al-Irsyad RPL (Vocational Foundation) === */}
      <group position={[3.2, 0.4, 0]}>
        <mesh ref={rightNodeRef}>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
        <mesh scale={[1.25, 1.25, 1.25]}>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshBasicMaterial color="#ec4899" wireframe transparent opacity={0.6} />
        </mesh>
        <mesh ref={rightRingRef}>
          <torusGeometry args={[1.1, 0.02, 8, 36]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
        <pointLight color="#ec4899" intensity={3.0} distance={6} />
      </group>

      {/* === CENTRAL CONNECTING LASER BRIDGE LINE === */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[6.4, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={2.8}
        />
      </mesh>

      {/* Oscillating Neon Signal Pulse Packet */}
      <mesh ref={pulseRef} position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Circuit PCB Floor Lines */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <group key={i} position={[x * 1.5, -1.8, -1]}>
          <mesh>
            <boxGeometry args={[0.04, 0.02, 5]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
